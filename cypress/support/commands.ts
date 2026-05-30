export {};

declare global {
  namespace Cypress {
    interface Chainable {
      nullChainable(): null;
    }
  }
}

Cypress.Commands.add('nullChainable', () => {
    // Implement Cypress-specific logic for verifying link navigation
    return null;
})