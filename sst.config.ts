import lodash from 'lodash';
import { SSTConfig } from 'sst';

import { Network, Database, Api, Storage, Web, Migration } from './stacks';

const { kebabCase } = lodash;

const stacks = [Storage, Network, Database,Migration, Api, Web];
export default {
  config(_input) {
    return {
      name: 'erecruitment',
      region: 'af-south-1',
    };
  },
  async stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      nodejs: {
        install: ['pg', 'knex', 'pino-pretty', 'pino', 'argon2'],
      },
    });

    for await (const stack of stacks) {
      const id = kebabCase(stack.name);

      await app.stack(stack, { id });
    }
  },
} satisfies SSTConfig;
