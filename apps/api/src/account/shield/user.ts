


import { rule } from 'graphql-shield';
import { Context } from '~/context';
import { UserRole } from '../user';

export const isActiveUser = rule({ cache: 'contextual' })(async (parent, args, ctx: Context) => {
  return ctx.auth.isActiveUser();
});

const createUserRoleRule = (roles: UserRole[]) => {
  return rule({ cache: 'contextual' })(async (parent, args, ctx: Context) => {
    return ctx.auth.hasOneOfRole(roles);
  });
};
export const isSecretaryGeneral = createUserRoleRule([UserRole.SecretaryGeneral])
export const isDashboardOperator = createUserRoleRule([UserRole.Recruiter, UserRole.Admin, UserRole.SuperAdmin, UserRole.SecretaryGeneral])
export const isApplicant = createUserRoleRule([UserRole.Applicant])
export const isAdmin = createUserRoleRule([UserRole.Admin, UserRole.SuperAdmin])
export const isSuperAdmin = createUserRoleRule([UserRole.SuperAdmin])