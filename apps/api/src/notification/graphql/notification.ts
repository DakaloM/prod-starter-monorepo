import { builder } from "~/graphql/builder";
import { Notification, NotificationCategory, NotificationMessage, NotificationStatus, NotificationTitle } from "../notification";
import { isActiveUser } from "~/account/shield";
import { getNotifications } from "../queries";



export const NotificationCategorySchema = builder.enumType(NotificationCategory, {
  name: 'NotificationCategory',
  description: 'Notification category'
});


export const NotificationStatusSchema = builder.enumType(NotificationStatus, {
  name: 'NotificationStatus',
  description: 'Notification status'
});

export const NotificationFilter = builder.inputType('NotificationFilter', {
  fields: (t) => ({
    category: t.field({type: 'String', required: false}),
    message: t.field({type: "String", required: false}),
    limit: t.field({type: 'Int', defaultValue: 20}),
    page: t.field({type: 'Int', defaultValue: 1})
  })
})

export const NotificationSchema = builder.objectType(Notification, {
  name: 'Notification',
  shield: isActiveUser,
  description: 'A notification is a communication to notify any user about any updates in the system',
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    refId: t.exposeString('refId'),
    category: t.expose('category', {type: NotificationCategorySchema, description: 'Notification category'}),
    message: t.exposeString('message'),
    title: t.exposeString('title'),
    status: t.expose('status', {type: NotificationStatusSchema, description: 'Notification status'}),
    createdAt: t.expose('createdAt', {type: 'Date', description: 'Creation date and time for each notification'}),

  })
});

builder.queryField('notifications', (t) =>
  t.field({
    shield: isActiveUser,
    description: 'A list of user notifications',
    args: {
      input: t.arg({ required: false, type: NotificationFilter }),
    },
    type: [NotificationSchema],
    resolve: async (_root, args, ctx) => {
      return getNotifications(args.input || {}, ctx);
    },
  }),
);


