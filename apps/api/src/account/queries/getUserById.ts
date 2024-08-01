import { NotFoundError } from '@imax/serverkit';

import { User } from '~/account/user';
import { Context } from '~/context';

export async function getUserById(id: string, ctx: Context) {
  const user = await User.query(ctx.db).findById(id);

  if (!user) {
    throw new NotFoundError({
      message: 'User not found',
    });
  }

  return user;
}

