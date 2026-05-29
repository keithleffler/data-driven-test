import { TestAction,  CypressReturnType } from "@lib/test-actions/test-action";

export class CypressTestAction extends TestAction {
    verifyLinkNavigation = (): CypressReturnType => {
        return cy.wrap(null);
    }
    verifyText = (): CypressReturnType => {
        return cy.wrap(null);
    }
}   
