'use client';

import { Dialog, DialogContent, DialogTrigger, Button, closeDialog, Loader } from '@imax/ui';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { executeApi } from '~/client/api';

export const UpdateBulkNotifications = ({ ids, task, title }: UpdateBulkNotificationsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      await executeApi(task, {
        ids: ids,
      });
      setLoading(false);
     location.reload();
      closeDialog();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex my-auto hover:bg-primary hover:text-white w-full "
          variant={'ghost'}
        >
          <span className="whitespace-nowrap">{title}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-screen overflow-y-auto flex flex-col items-center gap-4">
        <h1 className="font-bold text-gray-500">{title}</h1>
        <p className="text-sm text-gray-500">
          This action in not reversible, Are you sure you want to proceed?
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Button onClick={handleDelete} className="bg-green-500 text-white">
              Confirm
            </Button>

            <Button onClick={closeDialog} className="bg-primary text-white">
              Cancel
            </Button>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

type UpdateBulkNotificationsProps = {
  ids: string[];
  task: 'readAllNotifications' | 'deleteAllNotifications';
  title: string;
};
