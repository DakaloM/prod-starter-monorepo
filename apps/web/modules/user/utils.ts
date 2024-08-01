import { UserFragment, UsersFilter } from '@imax/client';

import { executeApi } from 'client/api';

export const createGetUsers = (filter: UsersFilter) => {
  return async function getUserOptions() {
    const data = await executeApi('users', { filter, page: 1, limit: 200 });
    const items = data.items as UserFragment[];

    return items.map(({ id, name, surname, role }) => ({
      value: id,
      label: `${name} ${surname} [${role}]`,
    }));
  };
};
