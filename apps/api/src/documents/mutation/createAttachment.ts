import { Context } from "~/context";
import { TypeIdentifier } from "~/type";
import { Attachment, AttachmentState, AttachmentType } from "../attachment";

type Args = {
  refId: string;
  refTypeIdentifier: TypeIdentifier;
  name: string;
  description: string | undefined;
  contentType: string;
  contentLength: number;
  type: AttachmentType;
};

export async function createAttachment(args: Args, ctx: Context) {
  const creatorId = ctx.auth.user?.id as string;
  const type = await ctx.resolveTypeAssert(args.refTypeIdentifier);


  return await Attachment.transaction(ctx.db, async (trx) => {
    const sequence = await ctx.bumpSequenceValue(
      args.refId,
      TypeIdentifier.Attachment,
      trx
    );

    const data = Attachment.createSchema().parse({
      ...args,
      state: AttachmentState.COMPLETED,
      creatorId,
      refTypeId: type.id,
      sequence,
      
    });

    const attachment = await Attachment.query(trx).insert({
      ...data,
      sequence,
      type: args.type,
    });

    return attachment;
  });
}
