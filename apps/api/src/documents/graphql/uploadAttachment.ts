import { builder } from '~/graphql/builder';

import { isActiveUser } from '~/account/shield';
import { createAttachment } from '../mutation';
import { TypeIdentifier } from '~/type';

import { AttachmentSchema } from './attachment';
import { AttachmentType } from '../attachment';
import { allow } from 'graphql-shield';

const UploadAttachmentInput = builder.inputType('UploadAttachmentInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    contentType: t.string({ required: true }),
    contentLength: t.int({ required: true }),
    description: t.string({ required: false }),
    refId: t.string({ required: true }),
    refTypeIdentifier: t.string({ required: true }),
    type: t.field({type: AttachmentType, required: true}),
  }),
  description: 'Input type for uploading an attachment.',
});

builder.mutationField('uploadAttachment', (t) =>
  t.field({
    args: {
      input: t.arg({ type: UploadAttachmentInput, required: true }),
    },
    type: AttachmentSchema,
    shield: allow,
    description: 'Uploads an attachment.',
    resolve: async (_parent, { input: args }, ctx) => {
      const attachment = await createAttachment(
        {
          contentLength: args.contentLength,
          contentType: args.contentType,
          name: args.name,
          refId: args.refId,
          refTypeIdentifier: args.refTypeIdentifier as TypeIdentifier,
          type: args.type,
          description: args.description ? args.description : undefined,
        },
        ctx,
      );

      return attachment;
    },
  }),
);

