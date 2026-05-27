describe('placeholder', () => {
  it('the-internet landing page loads', () => {
    cy.visit('/');
    cy.title().should('match', /The Internet/);
    cy.contains('h1', 'Welcome to the-internet').should('be.visible');
  });
});
