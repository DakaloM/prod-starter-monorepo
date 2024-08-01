import { Knex } from 'knex';
// @ts-ignore
import knexStringCase from 'knex-stringcase';
import { resolve } from 'path';
import { baseConfig } from '~/config/base';
import { databaseConfig as config } from '~/config/db';
import { logger } from '~/logger';

const root = process.cwd();

export const knexConfig: Knex.Config = {
  client: 'pg',
  connection: config.url,
  debug: baseConfig.debug.level === 'debug',
  pool: { min: 1, max: config.pool },
  log: {
    warn(message: string) {
      logger.warn(message);
    },
    error(message: string) {
      logger.error(message);
    },
    deprecate(message: string) {
      logger.info(message);
    },
    debug(message) {
      logger.debug(message);
    },
  },
  migrations: {
    directory: resolve(root, 'db/migrations'),
  },
  seeds: {
    directory: resolve(root, 'db/seeds'),
  },
};

export const knexfile = knexStringCase(knexConfig);
