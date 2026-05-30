import { FrameworkAdapter, CypressReturnType } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

export class CypressTestAction extends FrameworkAdapter {
    executeActions = (actions: TestAction[], options?: any): CypressReturnType => {
        return actions.reduce<CypressReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, cy.wrap(null));
    }

    getLinkByText = ({ linkText }: { linkText: string }): CypressReturnType => {
        return cy.contains("a", linkText);
    }

    navigateToPage = ({ url }: { url: string }): CypressReturnType => {
        return cy.visit(url);
    }

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
