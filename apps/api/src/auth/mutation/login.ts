import { ForbiddenError } from '@imax/serverkit';
import jwt from 'jsonwebtoken';

import * as argon from 'argon2';
import { User, UserStatus } from '~/account';
import { Context } from '~/context';

import { createAuthTokens } from './createAuthTokens';
import { config } from '~/config';

type CreateUserInput = {
  email: string;
  password: string;
};

export async function login(input: CreateUserInput, ctx: Context) {
  const user = await User.query(ctx.db).findOne({ email: input.email });

  if (!user?.password) {
    throw new ForbiddenError({
      message: 'Invalid credentials',
    });
  }

  if (user.status === UserStatus.Inactive) {
    throw new ForbiddenError({
      message: 'User account is inactive',
    });
  }

  if (user.status === UserStatus.NotConfirmed) {

    const secret = config.account.verifySecret || '154f60d2afd922d50bc4e384069c5f8267dbf0dec4ced6eeeb52eadd5dd07ffb';
    const token = jwt.sign({ id: user.id, email: input.email }, secret, { expiresIn: '1d' });

    await ctx.mailer.sendMail({
      to: input.email,
      subject: 'Confirm your email',
      data: {
        title: 'Confirm your email',
        subTitle: 'Confirm your email address',
        paragraphs: [
          `Please click the link below to confirm your email`,
          `<a href="http://localhost:3000/confirm-email?token=${token}">Confirm email</a>`,
        ],
        recipientName: `${user.name} ${user.surname}`,
      },
    });

    throw new ForbiddenError({
      message: 'Your email address has not been confirmed, please check your email for instructions',
    });
  }

  const isValid = await argon.verify(user.password, input.password);

  if (!isValid) {
    throw new ForbiddenError({
      message: 'Invalid credentials',
    });
  }

  return createAuthTokens(user, ctx);
}
