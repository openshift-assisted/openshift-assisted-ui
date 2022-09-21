export const storagePage = {
  validateODFUsage: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    cy.get(Cypress.env('odfUsageDataLabel'))
      .should('have.length', numMasters + numWorkers)
      .each((hostRole, idx) => {
        const isMaster = idx <= numMasters - 1;
        if (isMaster) {
          expect(hostRole).to.contain('Excluded for ODF');
        } else {
          expect(hostRole).to.contain('Use ODF');
        }
      });
  },
  validateNumberOfDisks: (
    numMasters: number = Cypress.env('NUM_MASTERS'),
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    cy.get(Cypress.env('diskNumberDataLabel'))
      .should('have.length', numMasters + numWorkers)
      .each((hostDisk) => {
        expect(hostDisk).to.contain('2');
      });
  },
   getSkipFormattingCheckbox: () => {
    return cy.get('input[id="select-formatted-0"]');
  },
  validateSkipFormattingDisks: (
    numWorkers: number = Cypress.env('NUM_WORKERS'),
  ) => {
    cy.get(Cypress.env('skipFormattingDataLabel'))
      .should('have.length', numWorkers)
    cy.get('input[type="checkbox"]').should('not.be.checked')
  },
  validateSkipFormattingWarning: () => {
    cy.get('.pf-c-alert__title').should('contain',Cypress.env('skipFormattingWarningTitle'));
    cy.get('.pf-c-alert__description').should('contain',Cypress.env('skipFormattingWarningDesc'));
  },
};
