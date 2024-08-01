import { Context } from '~/context';

import { Attachment, AttachmentState } from '../attachment';

/**
 * Returns a paginated list of attachments for a given ref.
 */
export async function getAttachmentsByUserId(userId: string, ctx: Context): Promise<Attachment[]> {
  const attachments = await Attachment.query(ctx.db).where({ userId });

  return attachments;
}
