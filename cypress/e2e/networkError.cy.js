describe('Network error', () => {
  beforeEach(() => {
    cy.visit('/index.html')
  })

  it('shows an error message when the network fails', () => {
    cy.intercept(
      'GET',
      'https://jsonplaceholder.typicode.com/todos/1',
      { forceNetworkError: true }
    ).as('networkError')
    cy.contains('button', 'Get TODO').click()
    cy.wait('@networkError')

    cy.contains(
      '.error span',
      'Oops, something went wrong. Check your internet connection, refresh the page, and try again.'
    ).should('be.visible')
  })
})
