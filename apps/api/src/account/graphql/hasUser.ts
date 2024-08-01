import { builder } from "~/graphql/builder";
import { UserSchema } from "./user";
import { getUserById } from "../queries";

//@ts-ignore
export const HasUserSchema = builder.interfaceType('HasUser', {
 
  fields: (t) => ({
    user: t.field({
      type: UserSchema,
      args: {},
      description: 'User object',
      
      resolve: async (root, args, ctx) => {
        //@ts-ignore
        return await getUserById(root.userId, ctx);
      },
    }),
  }),
});
