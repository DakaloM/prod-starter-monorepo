import { defineConfig, options } from '@imax/buildkit';

const external = options.external.concat(['vite-tsconfig-paths']);

export default defineConfig({
  ...options,
  external,
});
