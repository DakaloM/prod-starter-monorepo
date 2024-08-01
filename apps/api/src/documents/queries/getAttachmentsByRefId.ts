
import { Context } from '~/context';

import { Attachment } from '../attachment';

export type Args = {
  refId: string;
  refTypeId: string;
};

/**
 * Returns a paginated list of attachments for a given ref.
 */
export async function getAttachmentsByRef(args: Args, ctx: Context): Promise<Attachment[]> {
  const query = Attachment.query(ctx.db)
    .distinct('attachment.id')
    .select('attachment.*')
    .where('attachment.refId', '=', args.refId)
    .where('attachment.refTypeId', '=', args.refTypeId)

  
  const attachments = await query;

  return attachments;
}
