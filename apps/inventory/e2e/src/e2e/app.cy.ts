describe('inventory-e2e', () => {
  beforeEach(() => cy.visit('/inventory'));

  it('should load the inventory page', () => {
    cy.get('#inventoryTitle').contains('Inventory');
  });

});
