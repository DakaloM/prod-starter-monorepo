import { StackContext, use, Function as Handler } from 'sst/constructs';

import { Database } from './database';

export function Migration({ stack, app }: StackContext) {
  const db = use(Database);

  const environment = {
    DATABASE_URL: db.url,
    REGION: app.region,
    STAGE: stack.stage,
  };

  const migrate = new Handler(stack, 'handler', {
    functionName: app.logicalPrefixedName('migration'),
    handler: 'apps/api/src/lambda/db/migrate.handler',
    environment: environment,
    copyFiles: [{ from: 'apps/api/dist/db/migrations', to: './apps/api/db/migrations' }],
  });

  const seed = new Handler(stack, 'seed', {
    functionName: app.logicalPrefixedName('seed'),
    handler: 'apps/api/src/lambda/db/seed.handler',
    environment: environment,
    copyFiles: [{ from: 'apps/api/dist/db/seeds', to: './apps/api/db/seeds' }],
  });

  return {
    migrate,
    seed,
  };
}
