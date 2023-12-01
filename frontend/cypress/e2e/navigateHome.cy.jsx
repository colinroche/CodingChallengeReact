describe('Routing Test', () => {
  it('When website is visited it should open on home', () => {
    // visiting the root URL
    cy.visit('https://coding-challenge-react-frontend.vercel.app')

    cy.get('label').contains('Please enter your desired country below:')
  })

  it('It should navigate to home when the Home link in the navbar is pressed', () => {
    cy.visit('https://coding-challenge-react-frontend.vercel.app')

    // click the link in the navbar that says home
    cy.get('nav').find('a').click()

    cy.get('label').contains('Please enter your desired country below:')
  })
})