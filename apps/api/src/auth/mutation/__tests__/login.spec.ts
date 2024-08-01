import { faker } from '@imax/testkit';

import crypto from 'node:crypto';
import { Token } from '~/auth/token';
import { Context } from '~/context';
import { createContext, destroyContext } from '~/test/context';
import { Environment, createEnv, destroyEnv } from '~/test/environment';
import { Factory, createFactory } from '~/test/factory';

import { login } from '../login';

describe('auth/mutation/login', () => {
  let env: Environment;
  let ctx: Context;
  let factory: Factory;
  beforeAll(async () => {
    env = await createEnv();
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

  it('should throw error when user does not exist', async () => {
    await expect(
      login(
        {
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
        ctx,
      ),
    ).rejects.toMatchSnapshot();
  });

  it('should throw error when user does not have a password', async () => {
    const user = await factory.insert('user');
    await expect(
      login(
        {
          email: user.email,
          password: faker.internet.password(),
        },
        ctx,
      ),
    ).rejects.toMatchSnapshot();
  });

  it('should authenticate user', async () => {
    const password = crypto.randomBytes(10).toString('hex');
    const user = await factory.insert('user', { password });

    const tokens = await login({ email: user.email, password }, ctx);

    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
    expect(tokens.expiresIn).toBeDefined();
    expect(tokens.expiresAt).toBeDefined();

    const token = (await Token.fromString(tokens.accessToken, ctx)) as Token;
    expect(token).toBeDefined();
    expect(token.userId).toEqual(user.id);
  });
});
