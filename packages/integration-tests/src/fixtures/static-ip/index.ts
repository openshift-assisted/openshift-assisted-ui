import { getBaseCluster, getBaseInfraEnv } from './1-cluster-created';

const initialCluster = getBaseCluster({ name: 'ai-e2e-static-ip' });
const initialInfraEnv = getBaseInfraEnv();

const createStaticIpFixtureMapping = {
  clusters: {
    default: initialCluster,
  },
  infraEnvs: {
    default: initialInfraEnv,
  },
};
export default createStaticIpFixtureMapping;
