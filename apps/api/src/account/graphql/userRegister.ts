// import { allow } from 'graphql-shield';
// import { builder } from '~/graphql/builder';
// import { UserSchema } from './user';
// import { userRegister } from '../mutations';
// import { TokensRef } from '~/auth/graphql/tokens';
// import { isActiveUser } from '../shield';

// const UserRegisterInput = builder.inputType('UserRegisterInput', {
//   fields: (t) => ({
//     name: t.string({ required: true }),
//     surname: t.string({ required: true }),
//     email: t.string({ required: true }),
//     idNumber: t.string({required: true}),
//     password: t.string({required: true}),
//     confirmPassword: t.string({required: true}),
//     mobileNumber: t.string({required: true}),
//     businessNumber: t.string({required: false}),
//     privateNumber: t.string({required: false}),
//   }),
// });

// builder.mutationField('userRegister', (t) => (
//   t.field({
//     shield: allow,
//     description: 'Register a new user',
//     args: {
//       input: t.arg({type: UserRegisterInput, required: true}),
//     },
//     type: UserSchema,
//     resolve: async (_root, args, ctx) => {
//       return userRegister(args.input, ctx);
//     }
//   })
// ))
