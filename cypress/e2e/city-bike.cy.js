describe('City-bike App', function() {
  beforeEach(function() {
    cy.initilalize()
    cy.visit('http://localhost:3000')
  })

  describe('Test Visual Content', function() {
    it('Front page open correctly', function() {
      cy.contains('About this App')
    })
    it('App menu are visbale and functioning', function() {
      cy.contains('Trips').click()
      cy.url().should('include', '/trips')
      cy.contains('Trips information')
      cy.contains('Stations').click()
      cy.url().should('include', '/stations')
      cy.contains('Station information')
      cy.contains('StationInfo').click()
      cy.url().should('include', '/station/')
      cy.contains('Upload Data').click()
      cy.url().should('include', '/uploadFiles')
      cy.contains('Please choose what information you want to upload')
    })
    describe('Test Trip Page', function() {
      beforeEach(function() {
        cy.contains('Trips').click()
      })

      it('Test Table content', function() {
        cy.contains('Viiskulma')
      })

      it('Test Pagination', function() {
        cy.contains('Rows per page')
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click()
        cy.contains('Ratsutori(727)')
      })

      it('Test Filter', function() {
        cy.contains('of 25')
        cy.contains('Filter').click()
        cy.get('#distanceTo').type(2)
        cy.get('[data-testid="filterButton"]').click()
        cy.contains('of 16')
        cy.get('[data-testid="resetButton"]').click()
        cy.contains('of 25')
      })
    })

    describe('Test Station Page', function() {
      beforeEach(function() {
        cy.contains('Stations').click()
      })

      it('Test Table content', function() {
        cy.contains('Sateentie')
      })

      it('Test Pagination', function() {
        cy.contains('Rows per page')
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click()
        cy.contains('Keilaranta')
      })
    })

    describe('Test Station Info Page', function() {
      beforeEach(function() {
        cy.contains('Stations').click()
      })

      it('page forward to station info by click on station', function() {
        cy.contains('Sateentie').click()
        cy.url().should('include', '/station/')
        cy.contains('Station information')
      })

      it('Show Statistics', function() {
        cy.contains('Sateentie').click()
        cy.get('[data-testid="originTable"]').find('tr').should('have.length', 4)
        cy.get('[data-testid="originTable"]')
          .contains('Pohjolankatu')
          .parent()
          .contains('3.2')
        cy.get('[data-testid="destinationTable"]').find('tr').should('have.length', 5)
        cy.get('[data-testid="destinationTable"]')
          .contains('Kansallismuseo')
          .parent()
          .contains('22.9')
        cy.get('[data-testid="stationTable"]')
          .contains('Station capacity')
          .parent()
          .contains('18')
        cy.get('[data-testid="stationTable"]')
          .contains('Total trip from this station')
          .parent()
          .contains('2')
      })
    })
  })
})