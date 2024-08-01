import { Context } from '~/context';

import { Attachment } from '../attachment';

export async function updateAttachment(id: string, ctx: Context) {
  return await Attachment.transaction(ctx.db, async (trx) => {
    const attachment = await Attachment.query(trx)
      .where('attachment.id', '=', id)
      .first();

    if (!attachment) {
      const attachment = new Attachment();
      attachment.id = id;
      return attachment;
    }

    return attachment;
  });
}
