import { BaseModel } from '@imax/datakit';

import mime from 'mime-types';
import path from 'path';
import { User } from '~/account/user';
import { Validator } from '~/domain/validation';
import { Type, TypeIdentifier } from '~/type/type';

import { ContentType, contentTypes } from './contentTypes';

export { AttachmentVersion } from './version';

export enum AttachmentState {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum AttachmentType {
  CertificateOrDiploma = 'Certificate/Diploma',
  CriminalRecordDocument = 'Criminal record document',
  NationalIdOrPassport = 'National Id or passport',
  ProofOfResidence = 'Proof of residence',
  CoverLetter = 'Cover letter',
  Resume = 'Resume',
  Other = 'Other',
  Offer = 'Offer',
  OfferResponse = 'Offer response',
}

export const maxContentLength = 100 * 1024 * 1024; // 100mb
export class Attachment extends BaseModel {
  id: string;
  contentType: ContentType;
  sequence: number;
  contentLength!: number;
  creator: User;
  creatorId: string;
  refId: string;
  refTypeId: string;
  name: string;
  description: string;
  createdAt!: Date;
  type: AttachmentType;
  state: AttachmentState;
  versionCount: number;
  updatedAt: Date;

  static tableName = 'attachment';
  static typeIdentifier = TypeIdentifier.Attachment;

  static createSchema() {
    return Validator.create((z, is) =>
      z.object({
        contentType: z.enum(contentTypes),
        contentLength: z.number().positive().max(maxContentLength),
        description: z.string().trim().min(1).max(5000).optional(),
        creatorId: z.string().uuid(),
        name: z.string().trim().superRefine(is.filename),
        refId: z.string().uuid(),
        refTypeId: z.string().uuid(),
        state: z.nativeEnum(AttachmentState),
        sequence: z.number().positive().min(1),
      }),
    );
  }

  static updateSchema() {
    return Validator.create((z, is) =>
      z.object({
        description: z.string().trim().min(1).max(5000).optional(),
        editorId: z.string().uuid(),
        name: z.string().trim().min(1).max(5000).optional(),
        state: z.nativeEnum(AttachmentState).optional(),
        updatedAt: z.date(),
      }),
    );
  }

  static parseContentType(filename: string) {
    const ext = path.extname(filename);

    const mimeType = mime.contentType(ext) as string;

    return mimeType;
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'attachment.userId',
          to: 'user.id',
        },
      },
    };
  }
}
