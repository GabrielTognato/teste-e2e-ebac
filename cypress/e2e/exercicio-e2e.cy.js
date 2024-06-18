/// <reference types="cypress" />
const produtos= require('../fixtures/produtos.json')
const faker = require('faker');



context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('produtos')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.fixture('produtos').then((Dados) => {
          Dados.produtos.forEach(produto => {
            cy.addProdutoCarrinho(produto)
          })


          cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
          cy.clicarCheckout()
          cy.get('.order-total > td').should('contain', 'R$214,50')
        .then(()=> {

        const informacoesCadastro = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                company: faker.company.companyName(),
                country: 'Brazil',  
                address1: faker.address.streetAddress(),
                address2: faker.address.secondaryAddress(),
                city: faker.address.city(),
                state: 'São Paulo', 
                postcode: faker.address.zipCode(),
                phone: faker.phone.phoneNumber(),
                email: faker.internet.email()
            };

          cy.preencherEndereço(informacoesCadastro)
          cy.wait(8000);
          cy.get('.woocommerce-notice').should('contain', 'pedido foi recebido.')
          });
        });
     });
 });