'use client';

import {  UserFragment } from '@imax/client';
import { Badge, Button } from '@imax/ui';

import { MoreHorizontalIcon } from 'lucide-react';

export function ViewUser({ user: { id, name, surname, email, role } }: { user: UserFragment }) {
  const fields = [
    {
      title: 'Name',
      value: name,
    },
    {
      title: 'Surname',
      value: surname,
    },
  ];

  return (
    <div className="flex rounded-lg shadow-sm border bg-card py-4 px-8 grid-cols-6 gap-8 w-full">
      <div className="grid gap-8 flex-grow">
        <div className="flex flex-wrap w-full justify-around gap-8">
          {fields.map(({ title, value }) => (
            <div key={title} className="flex flex-col gap-2">
              <span className="text-xs font-light text-muted-foreground">{title}:</span>
              <span className="text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-light text-muted-foreground">User Email:</span>
          <span className="text-sm">{email}</span>
        </div>
      </div>
      <div className="flex gap-8 flex-auto px-2 md:px-10">
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-xs font-light text-muted-foreground">Role:</span>
          <span className="text-sm font-semibold">
            <Badge variant="secondary" className="text-white">
              {role}
            </Badge>
          </span>
        </div>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </div>
    </div>
  );
}
