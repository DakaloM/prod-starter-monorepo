import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { ReadAllNotificationsInput } from "./readAllNotifications";
import { deleteAllNotifications } from "../mutation";



builder.mutationField('deleteAllNotifications', (t) =>
  t.field({
    shield: isActiveUser,
    description: 'Delete all notifications of a user',
    args: {
      input: t.arg({ type: ReadAllNotificationsInput, required: true }),
    },
    type: 'Int',
    resolve: async (_root, args, ctx) => {
      return deleteAllNotifications(args.input, ctx);
    },
  }),
);
