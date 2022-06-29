import { getSomeElement } from '../support/app.po';

describe('Assisted UI integration', () => {
  beforeEach(() => cy.visit('/'));

  it('should display some message', () => {
    getSomeElement().contains('Dummy');
  });
});
