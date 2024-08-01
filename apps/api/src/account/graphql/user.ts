import { builder } from '~/graphql/builder';
import { isActiveUser, isDashboardOperator } from '~/account/shield';
import { Gender, UserRole, UserStatus, Race, Title, User } from '~/account/user';
import { nullable } from 'zod';
import { getUserById } from '../queries';
import { allow, or } from 'graphql-shield';


export const UserRoleSchema = builder.enumType(UserRole, {
  name: 'UserRole',
  description: 'User role',
});

export const getEnumValues = <T extends Record<string, any>>(enumType: T) => {
  return Object.keys(enumType).reduce((acc, key) => {
    return {
      ...acc,
      [key]: { value: enumType[key] },
    };
  }, {});
};


export const GenderSchema = builder.enumType(Gender, {
  name: 'Gender',
  description: 'Gender',
});

export const RaceSchema = builder.enumType(Race, {
  name: 'Race',
  description: 'Race',
});

export const TitleSchema = builder.enumType(Title, {
  name: 'Title',
  description: 'Title',
});

export const UserStatusSchema = builder.enumType(UserStatus, {
  name: 'UserStatus',
  description: 'User status',
});

export const UserSchema = builder.objectType(User, {
  name: 'User',
  shield: allow,
  description: 'A user is an human user or bot that can interact with the system.',

  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.field({
      type: 'EmailAddress',
      resolve: (root) => root.email,
    }),
    role: t.expose('role', { type: UserRoleSchema, description: 'The role of the user.' }),
    name: t.exposeString('name'),
    surname: t.exposeString('surname'),
    middleName: t.exposeString('middleName',{nullable: true}),
    title: t.exposeString('title' ,{nullable: true}),
    gender: t.exposeString('gender' ,{nullable: true}),
    idNumber: t.exposeString('idNumber'),
    race: t.exposeString('race' ,{nullable: true}),
    status: t.exposeString('status'),
    birthDate: t.expose('birthDate', {type: 'Date', nullable: true}),
    sequence: t.exposeInt('sequence'),
    applicantId: t.exposeString('applicantId', {nullable: true})
   
  }),
  
});

builder.queryField('user', (t) =>
  t.field({
    shield: or(isActiveUser, isDashboardOperator),
    description: 'A user',
    args: {
      id: t.arg.id({ required: true }),
    },
    type: UserSchema,
    resolve: async (_root, args, ctx) => {
      return getUserById(args.id.toString(), ctx);
    },
  }),
);

builder.queryField('me', (t) =>
  t.field({
    shield: isActiveUser,
    description: 'A user',
    type: UserSchema,
    resolve: async (_root, args, ctx) => {
      const id = ctx.auth.user?.id.toString() || '';

      return getUserById(id, ctx);
    },
  }),
);




