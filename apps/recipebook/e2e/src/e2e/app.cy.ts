describe('recipebook-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should load the app', () => {
    cy.get('#homeTitle').contains('Recipe Book');
  });
});
