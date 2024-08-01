'use client';

import { FullUserFragment, UserFragment } from '@imax/client';
import { Table } from '@imax/ui';

import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { z } from 'zod';

export const userSchema = z.object({
  // sequence: z.number(),
  id: z.number(),
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  role: z.string(),
});

interface UserListProps {
  users: FullUserFragment[];
}

export function UserList(props: UserListProps) {
  const router = useRouter();

  const data = props.users.map((user) => ({
    ...user,
    id: user.sequence,
  }));

  const users = useMemo(() => {
    const map = new Map<number, string>();
    props.users.forEach((user) => {
      map.set(user.sequence, user.id);
    });

    return map;
  }, [props]);

  const handleClick = (seq: string) => {
    const id = users.get(Number(seq));
    router.push(`/user/${id}`);
  };

  return (
    <section className="grid">
      <Table schema={userSchema} data={data} onClick={handleClick} />
    </section>
  );
}
