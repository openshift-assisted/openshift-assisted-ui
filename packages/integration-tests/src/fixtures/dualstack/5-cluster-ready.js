/* eslint-disable @typescript-eslint/camelcase */

import { clusterValidationsInfo } from '../cluster/validation-info-cluster-ready';

const clusterReadyBuilder = (baseCluster) => {
  return {
    ...baseCluster,
    e2e_mock_source: '5-dualstack',
    status: 'ready',
    status_info: 'Cluster ready to be installed',
    validations_info: JSON.stringify(clusterValidationsInfo),
    api_vip: '192.168.122.10',
    ingress_vip: '192.168.122.110',
  };
};

export { clusterReadyBuilder };
