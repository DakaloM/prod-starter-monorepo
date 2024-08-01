import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { readAllNotifications } from "../mutation";

export const ReadAllNotificationsInput = builder.inputType(
  "ReadAllNotificationsInput",
  {
    fields: (t) => ({
      ids: t.stringList({ required: true }),
    }),
  }
);

builder.mutationField("readAllNotifications", (t) =>
  t.field({
    shield: isActiveUser,
    description: "Mark all notifications as seen",
    args: {
      input: t.arg({ type: ReadAllNotificationsInput, required: true }),
    },
    type: ["Int"],
    resolve: async (_root, args, ctx) => {
      return readAllNotifications(args.input, ctx);
    },
  })
);
