import { hasWizardSignal, setLastWizardSignal, isAIAPIMocked } from './utils';
import { fakeClusterId, fakeClusterInfraEnvId } from './../fixtures/cluster/base-cluster';
import { hostIds } from '../fixtures/hosts';
import openShiftVersions from '../fixtures/infra-envs/openshift-versions';
import featureSupport from '../fixtures/infra-envs/feature-support';
import defaultConfig from '../fixtures/cluster/default-config';

import { initialList, updatedList } from '../fixtures/cluster-list';
import { infraEnv, imageDownload } from '../fixtures/infra-envs';
import { getUpdatedHosts } from '../fixtures/hosts';

import createSnoFixtureMapping from './../fixtures/create-sno';
import createMultinodeFixtureMapping from './../fixtures/create-mn';
import createReadOnlyClusterFixtureMapping from './../fixtures/read-only';

const allInfraEnvsApiPath = '/api/assisted-install/v2/infra-envs/';
const allClustersApiPath = '/api/assisted-install/v2/clusters/';

const infraEnvApiPath = `${allInfraEnvsApiPath}${fakeClusterInfraEnvId}`;
const clusterApiPath = `${allClustersApiPath}${fakeClusterId}`;

const mockClusterResponse = (req) => {
  const activeScenario = Cypress.env('AI_SCENARIO');
  let fixtureMapping = null;

  switch (activeScenario) {
    case 'AI_CREATE_SNO':
      fixtureMapping = createSnoFixtureMapping;
      break;
    case 'AI_CREATE_MULTINODE':
      fixtureMapping = createMultinodeFixtureMapping;
      break;
    case 'AI_READONLY_CLUSTER':
      fixtureMapping = createReadOnlyClusterFixtureMapping;
      break;
    default:
      break;
  }
  if (fixtureMapping) {
    const fixture = fixtureMapping[Cypress.env('AI_LAST_SIGNAL')] || fixtureMapping['default'];
    req.reply(fixture);
  } else {
    throw new Error('Incorrect fixture mapping for scenario ' + activeScenario);
  }
};

const setScenarioEnvVars = ({ activeScenario }) => {
  Cypress.env('AI_SCENARIO', activeScenario);

  switch (activeScenario) {
    case 'AI_CREATE_SNO':
      Cypress.env('ASSISTED_SNO_DEPLOYMENT', true);
      Cypress.env('NUM_MASTERS', 1);
      Cypress.env('NUM_WORKERS', 0);
      break;
    case 'AI_CREATE_MULTINODE':
      Cypress.env('ASSISTED_SNO_DEPLOYMENT', false);
      break;
    default:
      break;
  }
};

const addClusterCreationIntercepts = () => {
  cy.intercept('POST', allClustersApiPath, mockClusterResponse).as('create-cluster');
};

const addClusterListIntercepts = () => {
  cy.intercept('GET', allClustersApiPath, (req) => {
    const fixture = hasWizardSignal('CLUSTER_CREATED') ? updatedList : initialList;
    req.reply(fixture);
  });
};

const addClusterPatchAndDetailsIntercepts = () => {
  cy.intercept('GET', clusterApiPath, mockClusterResponse).as('cluster-details');

  cy.intercept('PATCH', clusterApiPath, (req) => {
    if (Cypress.env('AI_FORBIDDEN_CLUSTER_PATCH') === true) {
      throw new Error(`Forbidden patch: ${req.url} \n${JSON.stringify(req.body)}`);
    }

    req.alias = 'update-cluster';
    mockClusterResponse(req);
  });
};

const addInfraEnvIntercepts = () => {
  cy.intercept('GET', `${allInfraEnvsApiPath}?cluster_id=${fakeClusterId}`, [infraEnv]).as(
    'filter-infra-envs',
  );

  cy.intercept('GET', infraEnvApiPath, infraEnv).as('infra-env-details');

  cy.intercept('GET', `${infraEnvApiPath}/downloads/image-url`, imageDownload).as(
    'download-iso-image',
  );

  cy.intercept('PATCH', infraEnvApiPath, infraEnv).as('update-infra-env');

  cy.intercept('POST', allInfraEnvsApiPath, infraEnv).as('create-infra-env');
};

const addHostIntercepts = () => {
  cy.intercept('GET', `${infraEnvApiPath}/hosts/`, (req) => {
    const hostsFixture = getUpdatedHosts();
    req.reply(hostsFixture);
  });

  cy.intercept('PATCH', `${infraEnvApiPath}/hosts/**`, (req) => {
    const patchedHostId = req.url.match(/\/hosts\/(.+)$/)[1];
    const index = hostIds.findIndex((hostId) => hostId === patchedHostId);
    if (req.body.host_name) {
      req.alias = `rename-host-${index + 1}`;
    }

    const hostsFixture = getUpdatedHosts();
    req.reply(hostsFixture[index]);
  });
};

const addPlatformFeatureIntercepts = () => {
  cy.intercept('GET', `${clusterApiPath}/supported-platforms`, ['none']);

  cy.intercept('GET', '/api/assisted-install/v2/openshift-versions', openShiftVersions);

  cy.intercept('GET', '/api/assisted-install/v2/feature-support-levels', featureSupport);
};

const addAdditionalIntercepts = () => {
  cy.intercept('GET', '/api/assisted-install/v2/domains', [
    { domain: 'e2e.redhat.com', provider: 'route53' },
  ]);
  cy.intercept('GET', '/api/assisted-install/v2//default-config', defaultConfig);
};

const loadAiAPIIntercepts = (conf) => {
  if (!isAIAPIMocked()) {
    return;
  }
  Cypress.env('clusterId', fakeClusterId);

  if (conf !== null) {
    setLastWizardSignal(conf.activeSignal);
    if (conf.activeScenario) {
      setScenarioEnvVars(conf);
    }
  }

  addClusterCreationIntercepts();
  addClusterListIntercepts();
  addClusterPatchAndDetailsIntercepts();
  addInfraEnvIntercepts();
  addHostIntercepts();
  addPlatformFeatureIntercepts();
  addAdditionalIntercepts();
};

Cypress.Commands.add('loadAiAPIIntercepts', loadAiAPIIntercepts);
