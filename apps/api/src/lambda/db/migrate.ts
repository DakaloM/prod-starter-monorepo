import knex, { Knex } from 'knex';
import { resolve } from 'path';
import { knexfile } from '~/knex';

export const db = knex({
  ...knexfile,
  migrations: {
    directory: resolve(__dirname, '../../../db/migrations'),
  },
  seeds: {
    directory: resolve(__dirname, '../../../db/seeds'),
  },
});

export function getAction(db: Knex): ActionMap {
  return {
    MIGRATE: () => db.migrate.latest(),
    ROLLBACK: () => db.migrate.rollback(),
    UP: () => db.migrate.up(),
    DOWN: () => db.migrate.down(),
  };
}

export async function handler(event: Event) {
  try {
    const action = getAction(db)[event.mode];

    if (!action) {
      throw new Error(`Invalid event mode: ${event.mode}`);
    }

    return await action();
  } catch (error) {
    console.error({ error, __dirname }, 'Failed to migrate database');
    throw error;
  }
}

export interface Event {
  mode: 'ROLLBACK' | 'MIGRATE' | 'UP' | 'DOWN';
}

export type Action = () => Promise<void>;
export type ActionMap = Record<string, Action>;
