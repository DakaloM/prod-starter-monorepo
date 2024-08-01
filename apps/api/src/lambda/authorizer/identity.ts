import { APIGatewayAuthorizerResult } from 'aws-lambda';
import { AuthContext } from '~/auth';
import { isIdentityAuthorized } from '~/auth/queries';
import { ContextEvent, withContext } from '~/lambda/middleware';

export const defaultPolicy = {
  principalId: 'unauthenticated',
  policyDocument: {
    Statement: [],
    Version: '2012-10-17',
  },
};
const main = async (event: Event): Promise<APIGatewayAuthorizerResult> => {
  const { headers = {}, ctx } = event;
  const { authorization = '' } = headers;

  const userContext = await isIdentityAuthorized(authorization, ctx);

  if (!userContext) {
    return defaultPolicy;
  }

  return {
    principalId: userContext.token.userId.toString(),
    context: {
      userContext: AuthContext.encodeAuthContext(userContext),
    },
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: [
            'arn:aws:execute-api:*:*:*/*/POST/graphql',
            'arn:aws:execute-api:*:*:*/*/GET/graphql',
          ],
        },
      ],
    },
  };
};

export const handler = withContext(main);

type Event = ContextEvent;
