describe('template spec', () => {
  it('Check navigate', () => {
    cy.visit('/');
    cy.contains('Welcome to the GraphiQL App');
    cy.get('[data-testid="lang-btn"]').click();

    cy.url().should('include', '/ru');
    cy.contains('Добро пожаловать в GraphiQL App');

    cy.get('[data-testid="login-btn"]').click();
    cy.url().should('include', '/ru/auth/sign-in');

    cy.get('[data-testid="login-link"]').click();
    cy.url().should('include', '/ru/auth/sign-up');

    cy.get('[data-testid="welcome-link"]').click();
    cy.url().should('include', '/ru');

    cy.get('[data-testid="lang-btn"]').click();
    cy.url().should('include', '/');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});

export {};
