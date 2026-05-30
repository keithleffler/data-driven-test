import { FrameworkAdapter, CypressReturnType } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

export class CypressTestAction extends FrameworkAdapter {
    executeActions = (actions: TestAction[], options?: any): CypressReturnType => {
        return actions.reduce<CypressReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, cy.wrap(null));
    }

    // Internal helper, not part of the FrameworkAdapter contract — see playwright-adapter for why.
    getLinkByText = ({ linkText }: { linkText: string }): CypressReturnType => {
        return cy.contains("a", linkText);
    }

    navigateToPage = ({ url }: { url: string }): CypressReturnType => {
        return cy.visit(url);
    }

    // Uses .filter rather than cy.contains because cy.contains yields only the first match,
    // making any length assertion on its result trivially true.
    verifyLinkExists = ({ linkText }: { linkText: string }): CypressReturnType => {
        return cy.get("a").filter(`:contains("${linkText}")`).should("have.length", 1);
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
