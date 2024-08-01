import { createEmailClient } from '@imax/emailkit';

import { config } from '~/config';

export const mailer = createEmailClient(config.mail);
