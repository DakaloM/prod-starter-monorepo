
import { builder } from "~/graphql/builder";
import { GenderSchema, RaceSchema, TitleSchema, UserRoleSchema, UserSchema, UserStatusSchema } from "./user";
import { isActiveUser } from "../shield";
import { updateUser } from "../mutations";


const UpdateUserInput = builder.inputType('UpdateUserInput', {
  fields: (t) => ({
    id: t.string({required: true}),
    name: t.string({required: false}),
    middleName: t.string({required: false}),
    surname: t.string({required: false}),
    email: t.string({required: false}),
    title: t.field({type: TitleSchema, required: false}),
    race: t.field({type: RaceSchema, required: false}),
    gender: t.field({type: GenderSchema, required: false}),
    birthDate: t.field({type: 'Date', required: false}),
    idNumber: t.string({required: false}),
    role: t.field({type: UserRoleSchema, required: false}),
    status: t.field({type: UserStatusSchema, required: false})
  })
});

builder.mutationField('updateUser', (t) => (
  t.field({
    shield: isActiveUser,
    description: 'Update user',
    args: {
      input: t.arg({type: UpdateUserInput, required: true}),
    },
    type: UserSchema,
    resolve: async (_root, args, ctx) => {
      return updateUser(args.input, ctx);
    }
  })
))