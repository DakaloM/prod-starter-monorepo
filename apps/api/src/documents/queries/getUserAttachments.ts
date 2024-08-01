import { Context } from '~/context';

import { Attachment } from '../attachment';

export async function getUserAttachments(ctx: Context): Promise<Attachment[]> {
  const userId = ctx.auth?.user?.id as string;
  const query = Attachment.query(ctx.db)
    .distinct('attachment.id')
    .select('attachment.*')
    .where('attachment.userId', '=', userId);

  const attachments = await query;

  return attachments;
}
