describe('placeholder', () => {
  it('example.com loads', () => {
    cy.visit('/');
    cy.title().should('match', /Example Domain/);
  });
});
