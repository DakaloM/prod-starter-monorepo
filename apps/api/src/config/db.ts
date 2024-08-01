import { env } from '@imax/serverkit';

export const databaseConfig = {
  url: env.get('DATABASE_URL').required().asString(),
  pool: env.get('DATABASE_POOL').default(5).asIntPositive(),
};
