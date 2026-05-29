import { FrameworkAdapter } from "@lib/framework-adapter";

export class MainPage {
    constructor(protected adapter: FrameworkAdapter) {}
    navigateToPage(): void {
        this.adapter.navigateToPage("/");
    }
    verifyPageTitle(): void {
        cy.title().should("include", "The Internet");
        this.adapter.verifyPageTitle();
    }
    verifyLinkText(linkText: string): void {
        cy.contains("a", linkText).should("be.visible");
        this.adapter.verifyLinkText();
    }
    verifyLinkNavigation(linkText: string, expectedUrl: string): void {
        cy.contains("a", linkText).should("have.attr", "href").and("include", expectedUrl);
        this.adapter.verifyLinkNavigationWithUrl(linkText, expectedUrl);
    }
}