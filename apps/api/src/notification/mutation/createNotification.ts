import { Context } from "~/context";
import { Notification, NotificationCategory, NotificationMessage, NotificationStatus, NotificationTitle } from "../notification";
import { User } from "~/account";
import { NotFoundError } from "@imax/serverkit";

type Args = {
    userId: string;
    refId: string;
    category: NotificationCategory;
    title: NotificationTitle;
    message: NotificationMessage;
}


export async function createNotification(input: Args, ctx: Context) {
    const { userId, refId, category, title, message } = input;

    const user = await User.query(ctx.db).findById(userId);

    if (!user) {
        throw new NotFoundError({
            message: "User not found",
        });
    }

   return await Notification.query(ctx.db).insert({
        userId,
        refId,
        category,
        title,
        message,
        status: NotificationStatus.New,
    });
}