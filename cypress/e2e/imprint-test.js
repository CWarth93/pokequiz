describe('imprint e2e', () => {
  it('should display the imprint', () => {
    cy.visit('/imprint')
      .get('#content-area')
      .should('be.visible');
  });
});
