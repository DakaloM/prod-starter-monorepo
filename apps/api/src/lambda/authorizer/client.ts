import { APIGatewayAuthorizerResult } from 'aws-lambda';
import { ContextEvent, withContext } from '~/lambda/middleware';

import { defaultPolicy } from './identity';
import { isClientAuthorized } from '~/auth/queries';

const main = async (event: Event): Promise<APIGatewayAuthorizerResult> => {
  const { headers = {}, ctx } = event;
  const { authorization = '' } = headers;

  const client = await isClientAuthorized(authorization, ctx);

  if (!client) {
    return defaultPolicy;
  }

  return {
    principalId: client.id,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: [
            'arn:aws:execute-api:*:*:*/*/POST/auth/',
            'arn:aws:execute-api:*:*:*/*/POST/auth/passwordless/complete',
            'arn:aws:execute-api:*:*:*/*/GET/graphql',
            'arn:aws:execute-api:*:*:*/*/POST/auth/refresh-token',
            'arn:aws:execute-api:*:*:*/*/GET/auth/token/info',
          ],
        },
      ],
    },
  };
};

export const handler = withContext(main);

type Event = ContextEvent;
