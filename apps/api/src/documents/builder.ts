import { createBuilder } from '@imax/datakit';
import { faker } from '@imax/testkit';

import { Context } from '~/context';
import { TypeIdentifier } from '~/type';

import { Attachment, AttachmentState } from './attachment';

export const attachmentBuilder = createBuilder(
  // @ts-ignore
  async (attrs: Partial<Attachment>, _factory, ctx: Context) => {
    const userId = attrs.creatorId as string;
    const sequence = await ctx.bumpSequenceValue(userId, TypeIdentifier.Attachment);
    return Attachment.fromJson({
      name: faker.system.commonFileName('pdf'),
      contentType: 'application/pdf',
      contentLength: 100,
      state: AttachmentState.COMPLETED,
      sequence,
      ...attrs,
    });
  },
);
