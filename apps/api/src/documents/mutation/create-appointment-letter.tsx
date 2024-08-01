/* eslint-disable import/no-extraneous-dependencies */
import { NotFoundError } from '@imax/serverkit';

import { renderToStream } from '@react-pdf/renderer';
import { Stream } from 'node:stream';
import React from 'react';
import { Context } from '~/context';
import { newId } from '~/domain/id';
import { TypeIdentifier } from '~/type';

import { Attachment, AttachmentType } from '../attachment';
import { AppointmentLetterProps, AppointmentLetterTemplate } from '../template';
import { createAttachment } from './createAttachment';

export const streamToBuffer = (stream: Stream): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });

export const streamToString = (stream: Stream): Promise<string> =>
  streamToBuffer(stream).then((buffer) => buffer.toString('utf8'));

type Args = {
  offerId: string;
};

type Props = Args & AppointmentLetterProps;

export async function createLetter(input: Props, ctx: Context) {
  const stream = (await renderToStream(
    <AppointmentLetterTemplate {...input} />,
  )) as unknown as Stream;

  const data = await streamToBuffer(stream);

  await Attachment.transaction(ctx.db, async (trx) => {
    const fileName = `${input.offerId}.pdf`;
    const id = newId('uuid');

    const attachment = await createAttachment(
      {
        refId: input.offerId,
        refTypeIdentifier: TypeIdentifier.Offer,
        name: fileName,
        description: 'An offer letter for a job position',
        contentType: 'application/pdf',
        contentLength: data.length,
        type: AttachmentType.Offer,
      },
      ctx,
    );

    await ctx.storageClient.upload(attachment.id, data, 'application/pdf');

    return attachment;
  });
}
