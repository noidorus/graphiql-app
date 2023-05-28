describe('Sign in page', () => {
  it('Login with empty data', () => {
    cy.visit('/auth/sign-in');
    cy.get('[data-testid="auth-btn"]').click();
    cy.get('[data-testid="auth-error"]').should('have.length', 2);
  });

  it('Login with invalid data', () => {
    cy.visit('/auth/sign-in');

    cy.get('[name="email"]').type('abc');
    cy.get('[name="password"]').type('abc');

    cy.get('[data-testid="auth-btn"]').click();
    cy.get('[data-testid="auth-error"]').should('have.length', 2);
  });

  it('Login with valid data', () => {
    cy.visit('/auth/sign-in');

    cy.get('[name="email"]').type('test@gmail.com');
    cy.get('[name="password"]').type('Test-1234');

    cy.get('[data-testid="auth-btn"]').click();
    cy.url().should('include', '/app');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});

export {};
