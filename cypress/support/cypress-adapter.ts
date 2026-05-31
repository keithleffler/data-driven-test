import { FrameworkAdapter, CypressReturnType } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export class CypressTestAction extends FrameworkAdapter {
    executeActions = (actions: TestAction[], options?: any): CypressReturnType => {
        return actions.reduce<CypressReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, cy.wrap(null));
    }

    // Internal helper, not part of the FrameworkAdapter contract — see playwright-adapter for why.
    // Uses an exact-text regex so "File Download" doesn't also match "Secure File Download".
    getLinkByText = ({ linkText }: { linkText: string }): CypressReturnType => {
        return cy.contains("a", new RegExp(`^\\s*${escapeRegExp(linkText)}\\s*$`));
    }

    navigateToPage = ({ url }: { url: string }): CypressReturnType => {
        return cy.visit(url);
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

    clickLink = ({ linkText }: { linkText: string }): CypressReturnType => {
        return this.getLinkByText({ linkText }).click();
    }

    verifyUrl = ({ expectedUrl }: { expectedUrl: string }): CypressReturnType => {
        return cy.location("pathname").should("eq", expectedUrl);
    }
}
