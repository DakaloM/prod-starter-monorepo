import { isActiveUser } from "~/account/shield";
import { builder } from "~/graphql/builder";
import { NotificationSchema } from "./notification";
import { updateNotificationStatus } from "../mutation";

const UpdateNotificationStatusInput = builder.inputType('UpdateNotificationStatusInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    status: t.string({ required: false }),
  }),
});

builder.mutationField('updateNotificationStatus', (t) => 
  t.field({
    shield: isActiveUser,
    description: 'update notification status',
    args: {
      input: t.arg({type: UpdateNotificationStatusInput, required: true})
    },
    type: NotificationSchema,
    resolve: async (_root, args, ctx) => {
      return await updateNotificationStatus(args.input, ctx);
    }
  })
)
