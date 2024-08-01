import { builder } from '~/graphql/builder';

import { allow } from 'graphql-shield';
import { isActiveUser } from '~/account/shield';
import { getAttachmentById, getUserAttachments } from '~/documents/queries';


import { Attachment, AttachmentState, AttachmentVersion, AttachmentType } from '../attachment';

export const AttachmentStateSchema = builder.enumType(AttachmentState, {
  name: 'AttachmentState',
  description: 'Attachment state',
});

export const AttachmentTypeSchema = builder.enumType(AttachmentType, {
  name: 'AttachmentType',
  description: 'Type of attachment',
});

export const AttachmentSchema = builder.objectType(Attachment, {
  name: 'Attachment',
  description: 'An attachment to an object.',
  shield: allow,
  fields: (t) => ({
    id: t.exposeID('id'),
    refId: t.exposeString('refId'),
    contentLength: t.exposeInt('contentLength', {
      description: 'The size of the attachment in bytes.',
      nullable: false,
    }),
    sequence: t.exposeInt('sequence', {}),
    contentType: t.exposeString('contentType', {
      description: 'The content type of the attachment.',
      nullable: false,
    }),
    description: t.exposeString('description', {
      description: 'The description rendered to text of the attachment.',
      nullable: true,
    }),
    name: t.exposeString('name', {
      description: 'The name of the attachment.',
      nullable: false,
    }),
    type: t.expose('type', {
      type: AttachmentTypeSchema,
      description: 'The type of the attachment',
      nullable: false,
    }),
    state: t.expose('state', {
      type: AttachmentStateSchema,
      description: 'The state of the attachment.',
    }),
    versions: t.field({
      type: [AttachmentVersionType],
      description: 'Versions of the attachment.',
      resolve: async (parent, _args, ctx) => {
        const versions = await ctx.storageClient.getVersions(parent.id);

        return versions.map(
          (version) =>
            new AttachmentVersion(
              parent.id,
              parent.name,
              version.id,
              version.id,
              version.createdAt,
            ),
        );
      },
    }),
    uploadUrl: t.field({
      type: 'String',
      description: 'The URL to upload the attachment.',
      resolve: async (parent, args, ctx) => {
        const url = await ctx.storageClient.getUploadURL({
          path: parent.id,
          contentType: parent.contentType,
          contentLength: parent.contentLength,
        });

        return url;
      },
    }),
    downloadUrl: t.field({
      type: 'String',
      description: 'The URL to download the attachment.',
      resolve: (parent, _args, ctx) =>
        ctx.storageClient.getDownloadURL({
          name: parent.name,
          path: parent.id,
        }),
    }),
    createdAt: t.expose('createdAt', {
      type: 'Date',
      description: 'The creation date of the case',
    }),
  }),
});

export const AttachmentVersionType = builder.objectType(AttachmentVersion, {
  name: 'AttachmentVersion',
  description: 'A version of an attachment.',
  fields: (t) => ({
    attachmentId: t.exposeString('attachmentId', {
      description: 'The ID of the attachment.',
      nullable: false,
    }),
    attachmentName: t.exposeString('attachmentName', {
      description: 'The name of the attachment.',
      nullable: false,
    }),
    versionId: t.exposeString('versionId', {
      description: 'The ID of the version.',
      nullable: true,
    }),
    version: t.exposeString('version', {
      description: 'The version of the attachment.',
      nullable: false,
    }),
    insertedAt: t.field({
      type: 'Date',
      description: `The date and time when the version was created.`,
      nullable: true,
      resolve: (parent) => parent.insertedAt,
    }),
    downloadUrl: t.field({
      type: 'String',
      description: 'The URL to download the attachment.',
      resolve: (parent, _args, ctx) =>
        ctx.storageClient.getVersionDownloadURL(
          { name: parent.attachmentName, path: parent.attachmentId },
          parent.versionId,
        ),
    }),
  }),
});

builder.queryField('attachment', (t) =>
  t.field({
    type: AttachmentSchema,
    shield: allow,
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_parent, args, ctx) => getAttachmentById(args.id.toString(), ctx),
  }),
);

builder.queryField('userAttachments', (t) =>
  t.field({
    type: [AttachmentSchema],
    shield: isActiveUser,
    resolve: async (_parent, args, ctx) =>  await getUserAttachments(ctx),
  }),
);


