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
};
