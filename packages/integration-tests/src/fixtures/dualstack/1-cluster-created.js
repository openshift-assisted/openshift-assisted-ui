/* eslint-disable @typescript-eslint/camelcase */
import { baseCluster, fakeClusterId } from '../cluster/base-cluster';
import { initialValidationsInfo } from '../cluster/validation-info-initial-cluster';
import { clusterValidationInfo } from '../cluster/validation-info-host-discovery';
import { hostIds } from '../hosts';

const connectivityMajorityGroups = {
  IPv4: [],
  IPv6: [],
};

const featureUsage = {
  'SDN network type': {
    id: 'SDN_NETWORK_TYPE',
    name: 'SDN network type',
  },
  'VIP auto alloc.': {
    id: 'VIP_AUTO_ALLOC',
    name: 'VIP auto alloc.',
  },
  'Requested hostname': {
    data: {
      host_count: 3,
    },
    id: 'REQUESTED_HOSTNAME',
    name: 'Requested hostname',
  },
};

const featureUsageDualstack = {
  ...featureUsage,
  'Dual-stack': {
    id: 'DUAL-STACK',
    name: 'Dual-stack',
  },
};

const dualstackCluster = {
  ...baseCluster('ai-e2e-dualstack'),
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
  machine_networks: [
    {
      cidr: '192.168.122.0/24',
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
  // We're adding this field to easily debug which mock is returning the response
  e2e_mock_source: '1-dualstack-base',
  feature_usage: JSON.stringify(featureUsage),
  high_availability_mode: 'Full',
  network_type: 'OpenShiftSDN',
  user_managed_networking: false,
  vip_dhcp_allocation: true,
  connectivity_majority_groups: JSON.stringify(connectivityMajorityGroups),
  validations_info: JSON.stringify(clusterValidationInfo),
  enabled_host_count: 3,
  total_host_count: 3,
  status: 'pending-for-input',
  status_info: 'User input required',
};

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
  e2e_mock_source: '1-dualstack',
  feature_usage: JSON.stringify(featureUsageDualstack),
  validations_info: JSON.stringify(initialValidationsInfo),
  high_availability_mode: 'Full',
  network_type: 'OVNKubernetes',
  user_managed_networking: false,
  vip_dhcp_allocation: false,
});

export { clusterDualstackBuilder, dualstackCluster, featureUsage, featureUsageDualstack };
