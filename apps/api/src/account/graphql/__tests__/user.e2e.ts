import { UserRole } from '@imax/client';
import { faker } from '@imax/testkit';

import crypto from 'node:crypto';
import { updateUser } from '~/account/mutations';
import { User, UserStatus } from '~/account/user';
import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';
import { gql, request } from '~/test/graphql';

describe('account/graphql/user', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;

  const query = gql`
    query User($id: ID!) {
      user(id: $id) {
        id
        role
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

  it('should return a user', async () => {
    const user = await factory.insert('user', { role: UserRole.Admin });

    ctx.auth.update(user);

    const { data } = await request<Response>(env)
      .withContext(ctx)
      .query(query, { id: user.id })
      .expectNoErrors();
      

    expect(data?.user.id).toEqual(user.id);
    expect(data?.user.role).toEqual(user.role);
  });

  it('should throw error when user does not exist', async () => {
    const user = await factory.insert('user');
    ctx.auth.update(user);
    const { errors } = await request<Response>(env)
      .withContext(ctx)
      .query(query, { id: crypto.randomUUID() });

    expect(errors).toMatchSnapshot();
  });

});

type Response = {
  user: User;
};
