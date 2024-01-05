/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
      })
     
    it('Preenche os campos obrigatórios e envia o formulário', function() {  
        const LongText = 'teste, teste, teste, teste, teste, teste, teste, teste.'      
        cy.get('#firstName').type('Ana Claudia')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('ana@gft.com')
        cy.get('#open-text-area').type(LongText, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
      })

      it('Exibe mensagem de erro ao submeter o formulário com um e-mail inválido', function() {  
        const LongText = 'teste, teste, teste, teste, teste, teste, teste, teste.'      
        cy.get('#firstName').type('Ana Claudia')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('ana.gft.com')
        cy.get('#open-text-area').type(LongText, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
      })

      it('Campo telefone continua vazio continua vazio quando preenchido com valor não numérico', function() {  
        
        cy.get('#phone')
            .type('aabbccddeeff')
            .should('have.value', '')
        
      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {  
        
        cy.get('#firstName').type('Ana Claudia')
        cy.get('#lastName').type('Tavares')
        cy.get('#email').type('ana@gft.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        
      })

      it('preenche e limpa os campos: nome, sobrenome, e-mail e telefone', function(){
        cy.get('#firstName')
            .type('Ana Claudia')
            .should('have.value', 'Ana Claudia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Tavares')
            .should('have.value', 'Tavares')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('ana@gft.com')
            .should('have.value', 'ana@gft.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')
      })

      it('exige mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
      })

      it('envia o formulário com sucesso enviando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
      })

      it('verifica o título da aplicação', function() {        
        cy.contains('#subtitle','Forneça o máximo de informações, por favor')
      })

      it('Selecionar um produto por seu Texto', function() { 
        cy.get('#product')
            .select('YouTube')
            .should('have.value','youtube')      
        })

      it('Selecionar um produto por seu Value', function() { 
        cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')      
        // cy.get('select').select('YouTube')
        // cy.get('select').select(2)
      })

      it('Selecionar um produto por seu índice', function() { 
        cy.get('#product')
            .select(3)
            .should('have.value','mentoria')      
        // cy.get('select').select('YouTube')
        // cy.get('select').select(2)
      })

      it('Selecionar o tipo de atendimento', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
        // cy.get('[type="radio"]').check('feedback')
      })

      it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            .should('be.checked')
        })   
      })

      it('Marca e desmarca', function(){
        cy.get('#email-checkbox').click()
        cy.get('#email-checkbox').uncheck()
        })

        it('Marca ambos checkboxes e desmarca o último', function(){
            cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
        })

        it('Seleciona um arquivo da pasta fixtures', function(){
          cy.get('input[type=file]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function ($input) {
            expect($input[0].files[0].name).to.eq('example.json')})
      })

      it('Adicionando um arquivo por drag-and-drop', function(){
        cy.get('input[type=file]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: "drag-drop"})
        .should(function ($input) {
          expect($input[0].files[0].name).to.eq('example.json')})
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function ($input) {
          expect($input[0].files[0].name).to.eq('example.json')})
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr','target','_blank')
})

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
  cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('Talking About Testing').should('be.visible')
})
        
  })