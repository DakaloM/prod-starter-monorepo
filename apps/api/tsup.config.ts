import { options, defineConfig } from '@imax/buildkit';

export default defineConfig({
  ...options,
  dts: false,
  external: options.external.concat(['esbuild', '@imax/testkit']),
  format: ['cjs'],
  entry: ['src/index.ts', 'db/**/*.ts'],
});
