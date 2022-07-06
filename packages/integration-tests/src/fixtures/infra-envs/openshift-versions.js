/* eslint-disable @typescript-eslint/camelcase */

const versions = {
  '4.10': {
    cpu_architectures: ['x86_64', 'arm64'],
    default: true,
    display_name: '4.10.11',
    support_level: 'production',
  },
  4.6: {
    cpu_architectures: ['x86_64'],
    display_name: '4.6.16',
    support_level: 'production',
  },
  4.7: {
    cpu_architectures: ['x86_64'],
    display_name: '4.7.49',
    support_level: 'production',
  },
  4.8: {
    cpu_architectures: ['x86_64'],
    display_name: '4.8.39',
    support_level: 'production',
  },
  4.9: {
    cpu_architectures: ['x86_64'],
    display_name: '4.9.29',
    support_level: 'production',
  },
};

export default versions;
