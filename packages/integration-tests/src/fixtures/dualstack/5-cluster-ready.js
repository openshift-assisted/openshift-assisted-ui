/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/camelcase */

import { clusterValidationsInfo } from '../cluster/validation-info-cluster-ready';
import { fakeClusterId } from '../cluster/base-cluster';
import { hostIds } from '../hosts';

  const featureUsageDualstack = {
  'OVN network type': {
    id: 'OVN_NETWORK_TYPE',
    name: 'OVN network type',
  },
  'Requested hostname': {
    data: {
      host_count: 3,
    },
    id: 'REQUESTED_HOSTNAME',
    name: 'Requested hostname',
  },
  'Dual-stack': {
    id: 'DUAL-STACK',
    name: 'Dual-stack',
  },
};

const clusterReadyBuilder = (baseCluster) => ({
  ...baseCluster,
  e2e_mock_source: '5-dualstack-ipv4',
  status: 'ready',
  status_info: 'Cluster ready to be installed',
  validations_info: JSON.stringify(clusterValidationsInfo),
  api_vip: '192.168.122.10',
  ingress_vip: '192.168.122.110',
});


const clusterDualstackBuilder = (baseCluster) => ({
  ...baseCluster,
  cluster_networks: [
    {
      cidr: '10.128.0.0/14',
      cluster_id: fakeClusterId,
      host_prefix: 23,
    },
    {
      cidr: '2002:db8::/53',
      cluster_id: fakeClusterId,
      host_prefix: 64,
    },
  ],
  service_networks: [
    {
      cidr: '172.30.0.0/16',
      cluster_id: fakeClusterId,
    },
    {
      cidr: '2003:db8::/112',
      cluster_id: fakeClusterId,
    },
  ],
  machine_networks: [
    {
      cidr: '192.168.122.0/24',
      cluster_id: fakeClusterId,
    },
    {
      cidr: '1001:db9::/120',
      cluster_id: fakeClusterId,
    },
  ],
  host_networks: [
    {
      cidr: '192.168.122.0/24',
      host_ids: hostIds,
    },
    {
      cidr: '1001:db9::/120',
      host_ids: hostIds,
    },
  ],
  api_vip: '192.168.122.10',
  ingress_vip: '192.168.122.110',
  // We're adding this field to easily debug which mock is returning the response
  e2e_mock_source: '1-dualstack-dualstack',
  feature_usage: JSON.stringify(featureUsageDualstack),
  validations_info: JSON.stringify(clusterValidationsInfo),
  high_availability_mode: 'Full',
  network_type: 'OVNKubernetes',
  user_managed_networking: false,
  vip_dhcp_allocation: false,
});

export { clusterReadyBuilder, clusterDualstackBuilder, featureUsageDualstack};
