import { z } from 'zod';
import { AuthContext, UserContext } from '~/auth';
import { Context } from '~/context';
import { withResolverValidation } from '~/utils/validation';

async function handler(header: IdentityHeaderSchema, ctx: Context) {
  const [, id] = header.split('Bearer ');

  if (!id) {
    return false;
  }

  const auth = await AuthContext.init(id, ctx);

  if (!auth.token) {
    return false;
  }

  const context: UserContext = {
    token: auth.token,
  };

  return context;
}

const schema = z.string();
export const isIdentityAuthorized = withResolverValidation(handler, schema);
export type IdentityHeaderSchema = z.infer<typeof schema>;
