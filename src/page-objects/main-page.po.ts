export class MainPage { 
    navigateToPage(): void {
        cy.visit("https://the-internet.herokuapp.com/");
    }

        verifyPageTitle(): void {   
        cy.title().should("include", "The Internet");
    }   
}