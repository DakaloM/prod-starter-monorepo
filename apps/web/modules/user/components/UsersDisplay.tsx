'use client';

import { UserFragment } from '@imax/client';

import { Users2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { z } from 'zod';
import { ListDisplay } from '~/modules/shared/components';

import CreateUser from './CreateUser';

interface UsersDisplayProps {
  users: UserFragment[];
}

const schema = z.object({
  // sequence: z.number(),
  id: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  role: z.string(),
  status: z.string(),
});

export const UsersDisplay = ({ users }: UsersDisplayProps) => {
  const router = useRouter();

  const handleClick = async (user: z.infer<typeof schema>) => {
    router.push(`/dashboard/users/${user.id}`);
  };

  return (
    <ListDisplay
      data={users}
      schema={schema}
      onItemSelect={handleClick}
      Create={CreateUser}
      title='List of users'
      
    />
  );
};
