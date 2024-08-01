
import { builder } from "~/graphql/builder";
import { GenderSchema, RaceSchema, TitleSchema, UserRoleSchema, UserSchema, UserStatusSchema } from "./user";
import { createUser } from "../mutations";
import { isDashboardOperator } from "../shield";

const CreateUserInput = builder.inputType('CreateUserInput', {
  fields: (t) => ({
    name: t.string({required: true}),
    middleName: t.string({required: false}),
    surname: t.string({required: true}),
    email: t.string({required: true}),
    title: t.field({type: TitleSchema, required: true}),
    race: t.field({type: RaceSchema, required: true}),
    gender: t.field({type: GenderSchema, required: true}),
    birthDate: t.field({type: 'Date', required: true}),
    idNumber: t.string({required: true}),
    role: t.field({type: UserRoleSchema, required: true}),
    status: t.field({type: UserStatusSchema})
  })
});

builder.mutationField('createUser', (t) => (
  t.field({
    shield: isDashboardOperator,
    description: 'Create a user',
    args: {
      input: t.arg({type: CreateUserInput, required: true}),
    },
    type: UserSchema,
    resolve: async (_root, args, ctx) => {
      return await createUser(args.input, ctx);
    }
  })
))