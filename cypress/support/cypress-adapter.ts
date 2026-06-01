import { FrameworkAdapter, CypressReturnType } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export class CypressTestAction extends FrameworkAdapter {
    executeActions = (actions: TestAction[], options?: any): CypressReturnType => {
        return actions.reduce<CypressReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, cy.wrap(null));
    }

    clickLink = ({ linkText }: { linkText: string }): CypressReturnType => {
        return this.getLinkByText({ linkText }).click();
    }
    // Internal helper, not part of the FrameworkAdapter contract — see playwright-adapter for why.
    // Uses an exact-text regex so "File Download" doesn't also match "Secure File Download".
    getLinkByText = ({ linkText }: { linkText: string }): CypressReturnType => {
        return cy.contains("a", new RegExp(`^\\s*${escapeRegExp(linkText)}\\s*$`));
    }

    navigateToPage = ({ url }: { url: string }): CypressReturnType => {
        return cy.visit(url);
    }
    verifyAuthenticated = (): CypressReturnType => {
        return cy.contains("Congratulations").should("be.visible");
    }

    // Cypress can't reliably exercise the failure path through a real navigation:
    // cy.visit's auth option triggers the browser's native auth dialog on 401 (hangs),
    // and URL-embedded credentials are stripped by modern Chrome before the request is
    // sent. The honest test for "bad credentials rejected" is an HTTP-level assertion.
    verifyAuthFailed = ({ url, username, password }: { url: string; username: string; password: string }): CypressReturnType => {
        return cy.request({
            url,
            auth: { username, password },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.contain("Not authorized");
        });
    }

    // Filters with a predicate (rather than :contains) for two reasons:
    // (1) cy.contains yields only the first match, making length assertions on it trivially true;
    // (2) :contains is substring-only, which over-matches links like "Secure File Download".
    verifyLinkExists = ({ linkText }: { linkText: string }): CypressReturnType => {
        return cy.get("a").filter((_, el) => el.textContent?.trim() === linkText).should("have.length", 1);
    }

    verifyLinkHref = ({ linkText, expectedUrl }: { linkText: string; expectedUrl: string }): CypressReturnType => {
        return this.getLinkByText({ linkText }).should("have.attr", "href", expectedUrl);
    }

    verifyUrl = ({ expectedUrl }: { expectedUrl: string }): CypressReturnType => {
        return cy.location("pathname").should("eq", expectedUrl);
    }
}
