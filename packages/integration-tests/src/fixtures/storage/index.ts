import storageCluster from './storage-cluster';
import storageHosts from './storage-hosts';

const createStorageFixtureMapping = {
  clusters: {
    default: storageCluster,
  },
  hosts: storageHosts,
};

export default createStorageFixtureMapping;
