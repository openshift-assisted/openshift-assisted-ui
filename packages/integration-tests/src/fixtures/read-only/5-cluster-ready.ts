/* eslint-disable @typescript-eslint/naming-convention */

import { baseCluster, fakeClusterId } from '../cluster/base-cluster';
import { clusterValidationsInfo } from '../cluster/validation-info-cluster-ready';

const featureUsage = {
  'SDN network type': {
    id: 'SDN_NETWORK_TYPE',
    name: 'SDN network type',
  },
};

const readOnlyCluster = {
  e2e_mock_source: '1-base-cluster',
  monitored_operators: [
    {
      cluster_id: fakeClusterId,
      name: 'console',
      operator_type: 'builtin',
      status_updated_at: '0001-01-01T00:00:00.000Z',
      timeout_seconds: 3600,
    },
  ],
  cluster_networks: [
    {
      cidr: '10.128.0.0/14',
      cluster_id: fakeClusterId,
      host_prefix: 23,
    },
  ],
  service_networks: [
    {
      cidr: '172.30.0.0/16',
      cluster_id: fakeClusterId,
    },
  ],
  feature_usage: JSON.stringify(featureUsage),
  ...baseCluster('read-only-cluster'),
  status: 'ready',
  status_info: 'Cluster ready to be installed',
  validations_info: JSON.stringify(clusterValidationsInfo),
  high_availability_mode: 'Full',
  permissions: {
    canEdit: false,
  },
};

export { readOnlyCluster };
