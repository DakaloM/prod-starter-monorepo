import { NotFoundError } from '@imax/serverkit';

import { Context } from '~/context';
import { Attachment } from '~/documents/attachment';

export async function getAttachmentById(id: string, ctx: Context) {
  const attachment = await Attachment.query(ctx.db).findById(id);

  if (!attachment) {
    throw new NotFoundError({
      message: 'Attachment not found',
    });
  }

  return attachment;
}
