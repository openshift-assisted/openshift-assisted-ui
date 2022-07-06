// Installation
Cypress.env('hostnameDataTestId', `[data-testid=host-name]`);
Cypress.env('roleDataLabel', `td[data-label="Role"][data-testid="host-role"]`);
Cypress.env('cpuCoresDataLabel', `td[data-label='CPU Cores']`);
Cypress.env('memoryDataLabel', `td[data-label='Memory']`);
Cypress.env('totalStorageDataLabel', `td[data-label='Total storage']`);
Cypress.env(
  'clusterDetailButtonDownloadKubeconfigId',
  '#cluster-detail-button-download-kubeconfig',
);
Cypress.env(
  'clusterDetailClusterCredsTshootHintOpen',
  'cluster-detail-cluster-creds-troubleshooting-hint-open',
);
Cypress.env('clusterProgressStatusValueId', '#cluster-progress-status-value');
Cypress.env('operatorsProgressItem', `[data-testid=operators-progress-item]`);
