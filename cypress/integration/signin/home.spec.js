/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('load the home page', () => {
    cy.get('h1').should('have.text', 'Upload your files');

    cy.get('.btn').click();
  });
});
