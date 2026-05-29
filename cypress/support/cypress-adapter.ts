import { FrameworkAdapter,  CypressReturnType } from "@lib/framework-adapter";
import { TestAction } from "@lib/index";

export class CypressTestAction extends FrameworkAdapter {
    executeActions=(actions: TestAction[], options?: any): CypressReturnType => {
        return actions.reduce<CypressReturnType>((prev, action) => {
            return prev.then(() => action.actionFn(action.actionOptions ?? options));
        }, cy.wrap(null));
    }

    navigateToPage=({url}: {url: string}): CypressReturnType => {    
        return cy.visit(url);
    }
    // verifyLinkText = (options?: any): CypressReturnType => {
    //     return cy.wrap(null);
    // }
    // verifyLinkNavigationWithUrl = (options?: any): CypressReturnType => {
    //     return cy.wrap(null);
    // }
    // verifyPageTitle = (options?: any): CypressReturnType => {
    //     // Implement any additional logic if needed
    //     return cy.wrap(null);
    // }
    // verifyText = (options?: any): CypressReturnType => {
    //     // Implement any additional logic if needed
    //     return cy.wrap(null);
    // }   
}   
