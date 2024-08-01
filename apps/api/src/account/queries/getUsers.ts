
import { InternalError } from '@imax/serverkit';
import { Context } from '~/context';
import { applyPagination } from '~/domain/search';
import { User } from '../user';
import { UsersFilter } from '@imax/client';

type Page = {
  page: number;
  limit: number;
};

type Search = Page & UsersFilter;

export async function getUsers(search: Search, ctx: Context) {
  const { page = 1, limit = 20, ...filter } = search;

  const notRoles = filter.notRole ? [filter.notRole] : [];
  const roles = filter.role ? [filter.role] : [];

  console.log(roles)

  const query = User.query(ctx.db);


  if (roles.length) {
    query.whereIn('role', roles);
  }


  if (notRoles.length) {
    query.whereNotIn('role', notRoles);
  }

  User.applySearch(query, ctx.db, filter.name);

  const countQuery = query.clone().count('user.id').groupBy('user.id');

  const count = await countQuery.first().resultSize();

  applyPagination(query, search);

  const users = (await query) as (User & { objectId?: string })[];

  return {
    items: users.map((user) => ({
      ...user,
      id: user.objectId || user.id,
    })) as User[],
    total: count,
    hasNext: users.length < limit,
  };
}
