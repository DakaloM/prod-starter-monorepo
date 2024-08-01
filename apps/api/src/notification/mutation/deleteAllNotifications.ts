
import { ReadAllNotificationsInput } from '@imax/client';
import { Notification } from '../notification';

export async function deleteAllNotifications(input: ReadAllNotificationsInput, ctx: any) {

  return await Notification.query(ctx.db)
    .whereIn('id', input.ids)
    .delete();
}
