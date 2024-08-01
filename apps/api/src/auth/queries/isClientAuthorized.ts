import { verify } from 'argon2';
import { z } from 'zod';
import { Context } from '~/context';
import { withResolverValidation } from '~/utils/validation';
import { Client } from '../client';

async function handler(header: ClientHeaderSchema, ctx: Context) {
  const [, token] = header.split('Basic ');

  if (!token) {
    return false;
  }

  const [clientId, clientSecret] = Buffer.from(token, 'base64').toString().split(':');

  const client = await Client.query(ctx.db).findById(clientId);

  if (!client) {
    return false;
  }

  const isAuthorized = await verify(client.secret, clientSecret);

  return isAuthorized ? client : false;
}

const schema = z.string();
export type ClientHeaderSchema = z.infer<typeof schema>;
export const isClientAuthorized = withResolverValidation(handler, schema);
