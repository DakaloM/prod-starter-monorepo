import { builder } from '~/graphql/builder';

import { createPayload } from '~/domain/search';

import { getUsers } from '../queries';
import { isActiveUser } from '../shield';
import { UserRoleSchema, UserSchema, getEnumValues } from './user';
import { UserRole } from '../user';
import { EnumRef, ValuesFromEnum } from '@pothos/core';

export const RoleFilterSchema = builder.enumType('RoleFilter', {
  values: {
    ...getEnumValues(UserRole),
  },
}) as unknown as EnumRef<ValuesFromEnum<any>, ValuesFromEnum<any>>;

export const UsersFilter = builder.inputType('UsersFilter', {
  fields: (f) => ({
    role: f.field({ type: RoleFilterSchema, required: false }),
    name: f.field({ type: 'String', required: false }),
    notRole: f.field({ type: RoleFilterSchema, required: false }),
  }),
});



const UsersPayloadSchema = createPayload('UsersPayload', UserSchema);

builder.queryField('users', (t) =>
  t.field({
    shield: isActiveUser,
    description: 'List of users',
    args: {
      limit: t.arg.int({ defaultValue: 20 }),
      page: t.arg.int({ defaultValue: 1 }),
      filter: t.arg({ required: false, type: UsersFilter }),
    },
    type: UsersPayloadSchema,
    resolve: async (_root, args, ctx) =>
      getUsers(
        {
          limit: args.limit || 20,
          page: args.page || 1,
          ...args.filter,
        },
        ctx,
      ),
  }),
);

interface Count {
  count: string;
}
