import { UserRole } from '@imax/client';

import {
  Briefcase,
  ClipboardList,
  Component,
  Contact,
  FileText,
  LayoutDashboard,
  LucideProps,
  User,
  UserCheck,
  Users,
} from 'lucide-react';

export const links = [
  {
    title: 'Dashboard',
    url: '/dashboard/',
    Icon: LayoutDashboard,
    roles: [UserRole.Admin, UserRole.Recruiter, UserRole.SecretaryGeneral, UserRole.SuperAdmin],
  },

  {
    title: 'Requisitions',
    url: '/dashboard/requisitions',
    Icon: ClipboardList,
    roles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.SecretaryGeneral],
  },

  {
    title: 'Interviews',
    url: '/dashboard/interviews',
    Icon: Component,
    roles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.Recruiter],
  },
  {
    title: 'Jobs',
    url: '/dashboard/jobs',
    Icon: Briefcase,
    roles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.SecretaryGeneral],
  },

  {
    title: 'Applications',
    url: '/dashboard/applications',
    Icon: Contact,
    roles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.Recruiter],
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    Icon: Users,
    roles: [UserRole.Admin, UserRole.SuperAdmin],
  },

  {
    title: 'Candidates',
    url: '/dashboard/candidates',
    Icon: UserCheck,
    roles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.Recruiter, UserRole.SecretaryGeneral],
  },
  {
    title: 'Offers',
    url: '/dashboard/offers',
    Icon: FileText,
    roles: [UserRole.Admin, UserRole.SuperAdmin, UserRole.Recruiter, UserRole.SecretaryGeneral],
  },
];
