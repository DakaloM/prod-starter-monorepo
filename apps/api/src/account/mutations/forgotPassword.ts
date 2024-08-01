import { ExpiresInSeconds } from '@imax/cache';
import { ForbiddenError } from '@imax/serverkit';

import { User } from '~/account/user';
import { Context } from '~/context';

type Args = {
  email: string;
};

export async function forgotPassword({ email }: Args, ctx: Context) {
  const user = await User.query(ctx.db).findOne({
    email,
  });

  if (!user) {
    throw new ForbiddenError({});
  }
  const [, k] = Math.random().toString().split('.');
  const code = k.slice(0, 6);

  await ctx.cache.set(email, code, { amount: 5, value: ExpiresInSeconds.OneMinute });

  await ctx.mailer.sendMail({
    to: user.email,
    subject: 'Forgot password',
    data: {
      title: 'Forgot password',
      subTitle: '',
      paragraphs: [`Your code is <strong>${code}</strong>`],
    },
  });

  return '';
 
}
