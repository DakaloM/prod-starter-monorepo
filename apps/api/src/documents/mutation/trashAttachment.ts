import { Context } from '~/context';

import { Attachment } from '../attachment';

export async function trashAttachment(id: string, ctx: Context) {
  let attachment = await Attachment.query(ctx.db).where('attachment.id', '=', id).first();

  return await Attachment.transaction(ctx.db, async (trx) => {
    if (!attachment) {
      const attachment = new Attachment();
      attachment.id = id;
      return attachment;
    }

    await attachment.$query(ctx.db).delete();

    return attachment;
  });
}
