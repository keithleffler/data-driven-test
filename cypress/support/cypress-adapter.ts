import { FrameworkAdapter,  CypressReturnType } from "@lib/framework-adapter";

export class CypressAdapter extends FrameworkAdapter {
    navigateToPage(url: string): CypressReturnType {    
        return cy.visit(url);
    }
    verifyLinkText = (options?: any): CypressReturnType {
        // Implement any additional logic if needed
        return cy.wrap(null);
    }
    verifyLinkNavigationWithUrl = (linkText: string, expectedUrl: string): CypressReturnType => {
        // Implement any additional logic if needed
        return cy.wrap(null);
    }
    verifyPageTitle = (options?: any): CypressReturnType => {
        // Implement any additional logic if needed
        return cy.wrap(null);
    }
    verifyText = (options?: any): CypressReturnType => {
        // Implement any additional logic if needed
        return cy.wrap(null);
    }   
}   
