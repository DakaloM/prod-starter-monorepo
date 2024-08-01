import { options, defineConfig } from '@imax/buildkit';

export default defineConfig({
  ...options,
  external: options.external.concat(['pg', 'knex', 'objection']),
});
