import { Gender, Race, Title, UserStatus } from '~/account';
import { BadRequestError, NotFoundError } from '@imax/serverkit';

import * as saIdParser from 'south-african-id-parser';
import { Context } from '~/context';

import { User } from '../user';
import { UpdateUserInput } from '@imax/client';

export async function updateUser(input: UpdateUserInput, ctx: Context) {
  const { id, ...attrs } = input;
  const idNumber = attrs.idNumber ? attrs.idNumber : undefined;
  const name = attrs.name ? attrs.name : undefined;
  const surname = attrs.surname ? attrs.surname : undefined;

  const db = ctx.db;
  const user = await User.query(db).findById(id);

  if (!user) {
    throw new NotFoundError({
      message: 'User not found',
    });
  }

  if (idNumber) {
    const parseInfo = saIdParser.parse(idNumber);
    if (!parseInfo.isValid) {
      throw new BadRequestError({ message: 'Invalid RSA ID Number' });
    }
  }

  const sortName = User.getSortName(name ? name : user.name, surname ? surname : user.surname);
  const change = JSON.parse(JSON.stringify(attrs));
  const patchInput = {
    ...change,
    sortName: sortName,
  };

  const updatedUser = await user.$query(db).patchAndFetch(patchInput);

  return updatedUser;
}

