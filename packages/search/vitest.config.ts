import { baseConfig, mergeConfig } from '@imax/testkit';

export default mergeConfig(baseConfig, {
  test: {
    coverage: {
      exclude: ['src/index.ts', 'src/interface'],
    },
  },
});
