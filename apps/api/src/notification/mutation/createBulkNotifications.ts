import { NotFoundError } from '@imax/serverkit';
import { uniqueArray } from '@imax/utils';

import { User } from '~/account';
import { Context } from '~/context';

import { Notification, NotificationCategory, NotificationMessage, NotificationStatus, NotificationTitle } from '../notification';

type Args = {
  userIds: string[];
  refId: string;
  category: NotificationCategory;
  title: NotificationTitle;
  message: NotificationMessage;
};

export async function createBulkNotifications(input: Args, ctx: Context) {
  const { userIds, refId, category, title, message } = input;

  if (userIds.length === 0) {
    return;
  }

  const uniqueList = userIds.filter(uniqueArray);

  const users = await User.query(ctx.db).whereIn('id', uniqueList);

  if (users.length === 0) {
    throw new NotFoundError({
      message: 'No user account found',
    });
  }

  const notifications = users.map((user) => {
    return {
      userId: user.id,
      refId,
      category,
      title,
      message,
      status: NotificationStatus.New,
    };
  });

  await Notification.query(ctx.db).insertGraph(notifications);
}
