import { UpdateUserInput, UserFragment, UserRole } from '@imax/client';
import { faker } from '@imax/testkit';

import { User, UserStatus } from '~/account/user';
import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { gql, request } from '~/test/graphql';

describe('account/graphql/updateUser', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;

  const query = gql`
    fragment User on User {
      id
      role
      name
      surname
      email
      status
    }

    mutation UpdateUser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        ...User
      }
    }
  `;

  beforeAll(async () => {
    env = await createEnv({ server: true, db: true, cache: true });
  });

  afterAll(async () => {
    await destroyEnv(env);
  });

  beforeEach(async () => {
    ctx = await createContext(env);
    factory = createFactory(ctx);
  });

  afterEach(async () => {
    await destroyContext(ctx);
  });

  it('should update a user', async () => {
    const user = await factory.insert('user');
    ctx.auth.update(user);
    const update: UpdateUserInput = {
      id: user.id,
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      role: UserRole.SuperAdmin,
    };

    const response = await request<Response>(env).withContext(ctx).query(query, { input: update });

    expect(response.errors).toBeUndefined();
    expect(response.data?.updateUser).toBeDefined();
    const responseUser = response.data?.updateUser as User;
    expect(responseUser).toMatchObject(update);
  });
});

type Response = {
  updateUser: User
};
