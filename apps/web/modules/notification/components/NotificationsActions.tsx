import {  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@imax/ui';

import { CircleEllipsis, SettingsIcon } from 'lucide-react';
import { UpdateBulkNotifications } from './UpdateBulkNotification';

export function NotificationsActionButtons({ ids }: NotificationsActionButtonsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SettingsIcon className="rounded-lg hover:cursor-pointer text-gray-500" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid p-0 gap-1">
        <UpdateBulkNotifications ids={ids} title='Mark all as read' task='readAllNotifications'/>
        <UpdateBulkNotifications ids={ids} title='Delete all' task='deleteAllNotifications'/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type NotificationsActionButtonsProps = {
  ids: string[];
};
