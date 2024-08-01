import { BadRequestError, NotFoundError } from '@imax/serverkit';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, UserStatus } from '~/account';
import { config } from '~/config';
import { Context } from '~/context';

export async function confirmEmail(token: string, ctx: Context) {

  // Todo: remove this token scret here
  const secret =
    config.account.verifySecret ||
    '154f60d2afd922d50bc4e384069c5f8267dbf0dec4ced6eeeb52eadd5dd07ffb';

  const decoded = jwt.verify(token, secret) as JwtPayload & { userId: string; email: string };

  const currentTime = Math.floor(Date.now() / 1000);

  if (decoded.exp && decoded.exp < currentTime) {
    throw new BadRequestError({
      message: 'Token has expired',
    });
  }

  const id = decoded.id;
  const email = decoded.email;

  if (!id || !email) {
    throw new BadRequestError({
      message: 'Token is invalid',
    });
  }

  const user = await User.query(ctx.db).findById(id);
  if (!user) {
    throw new NotFoundError({
      message: 'User not found',
    });
  }

  return User.transaction(ctx.db, async (trx) => {
    const updatedUser = await user.$query(trx).patchAndFetch({
      status: UserStatus.Active,
    });

    return updatedUser;
  });
}
