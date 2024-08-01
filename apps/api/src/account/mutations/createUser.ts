import { CreateUserInput } from '@imax/client';
import { BadRequestError, ConflictError, NotFoundError } from '@imax/serverkit';
import { faker } from '@imax/testkit';

import { Knex } from 'knex';
import * as saIdParser from 'south-african-id-parser';
import { Context } from '~/context';
import { getMatchValues } from '~/domain/match';
import { Gender, UserRole, Race, Title, User, UserStatus } from '../user';

export async function createUser(input: CreateUserInput, ctx: Context, trx?: Knex) {
  const db = trx || ctx.db;
  const { email, idNumber, middleName, name, surname, birthDate } = input;

  const role = input.role as UserRole;
  const title = input.title as Title;
  const race = input.race as Race;
  const gender = input.gender as Gender;

  const existingUser = await User.query(db).where({ email }).orWhere({ idNumber }).first();

  if (existingUser) {
    throw new ConflictError({
      message: 'User already exists',
      path: getMatchValues(existingUser, { idNumber, email }),
    });
  }

  const parseInfo = saIdParser.parse(idNumber);
  if (!parseInfo.isValid) {
    throw new BadRequestError({ message: 'Invalid RSA ID Number' });
  }

  const sortName = User.getSortName(input.name, input.surname);

  return User.query(db).insert({
    email,
    idNumber,
    name,
    surname,
    middleName: middleName ? middleName : undefined,
    gender,
    race,
    title,
    birthDate,
    sortName,
    role,
    status: UserStatus.Active,
  });
}


