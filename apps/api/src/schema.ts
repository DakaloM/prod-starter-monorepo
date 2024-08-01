import { builder } from '~/graphql/builder';

import '~/auth/graphql';
import '~/graphql/scalars';
import '~/documents/graphql';
import '~/account/graphql';
import '~/notification/graphql';
import '~/type/graphql';


export const schema = builder.toSchema({});
