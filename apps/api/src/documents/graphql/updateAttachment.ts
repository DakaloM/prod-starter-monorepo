
import { builder } from '~/graphql/builder';

import { isActiveUser } from '~/account/shield';
import { TypeIdentifier } from '~/type';

import { Attachment, AttachmentType } from '../attachment';
import { AttachmentSchema } from './attachment';

const UpdateAttachmentInput = builder.inputType('UpdateAttachmentInput', {
  fields: (t) => ({
    id: t.string({ required: true }),
    description: t.string({ required: false }),
    type: t.field({type: AttachmentType, required: false}),
  }),
  description: 'Input type for uploading an attachment.',
});

builder.mutationField('updateAttachment', (t) =>
  t.field({
    args: {
      input: t.arg({ type: UpdateAttachmentInput, required: true }),
    },
    type: AttachmentSchema,
    shield: isActiveUser,
    description: 'Updates an attachment.',
    resolve: async (_parent, { input: args }, ctx) => {
      return Attachment.transaction(ctx.db, async (trx) => {

        const attachment = await Attachment.query(trx).patchAndFetchById(args.id, {
          type: args.type || undefined,
          description: args.description || undefined,
        });


        return attachment;
      });
    },
  }),
);
