Cypress.Commands.add('initilalize', () => {
  cy.request('POST', 'http://localhost:3005/test/reset')
    .then(() => {
      cy.request('POST','http://localhost:3005/test/uploadfiles')
    })
})

Cypress.Commands.add('clearDatabase', () => {
  cy.request('POST', 'http://localhost:3005/test/reset')
})