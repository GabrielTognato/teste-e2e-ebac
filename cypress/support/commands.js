Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('addProdutoCarrinho', (produto) => {
    cy.get('.products > .row').contains(produto.Nome).click()
    cy.get('#tab-description > :nth-child(1)').should ('exist')
    cy.get(`.button-variable-item-${produto.Size}`).click()
    cy.get(`.button-variable-item-${produto.Color}`).click() 
    cy.get('.single_add_to_cart_button').click()
    cy.get('#primary-menu > .menu-item-629 > a').click()
   


})

