'use client';

import { Row } from '@tanstack/react-table';
import { ArrowLeftRight, FileText, FolderSearch, FolderSync, MoreHorizontalIcon, Pen, Trash2, TrashIcon, ViewIcon } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';

import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from '../dropdown-menu';


export interface DataTableRowActionsProps<T extends z.ZodObject<any, any>> {
  row: Row<T>;
  Edit?: ({ defaults }: any) => JSX.Element;
  View?: ({ defaults }: any) => JSX.Element;
  Delete?: ({ defaults }: any) => JSX.Element;
  SendOffer?: ({ defaults }: any) => JSX.Element;
  Employ?: ({ defaults }: any) => JSX.Element;
  custom?: {
    onClick: (row: z.infer<T>) => void;
    title: string;
    icon?: JSX.Element;
    condition: (row: z.infer<T>) => boolean;
  }[];
}

export function DataTableRowActions<T extends z.ZodObject<any, any>>({
  row,
  Edit,
  View,
  Delete,
  SendOffer,
  Employ,
  custom,
}: DataTableRowActionsProps<T>) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showSendOfferDialog, setShowSendOfferDialog] = useState(false);
  const [showEmployDialog, setShowEmployDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const values = row
    .getVisibleCells()
    .reduce((acc, cell) => ({ ...acc, [cell.column.id]: cell.getValue() }), {}) as z.infer<T>;

  return (
    <DropdownMenu>
      {showEditDialog && Edit && <Edit defaults={values} />}
      {showViewDialog && View && <View defaults={values} />}
      {showSendOfferDialog && SendOffer && <SendOffer defaults={values} />}
      {showEmployDialog && Employ && <Employ defaults={values} />}
      {showDeleteDialog && Delete && <Delete defaults={values} />}

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {Boolean(View) && (
          <Button
          className="flex my-auto hover:bg-gray-200 text-gray-500 hover:text-black w-full items-center justify-between "
            variant={'ghost'}
            onClick={() => setShowViewDialog((prev) => !prev)}
          >
            <span className="ml-2">View</span>
            <ViewIcon className="w-5 h-5" />
          </Button>
        )}

        {Boolean(Edit) && (
          <Button
          className="flex my-auto hover:bg-gray-200 text-gray-500 hover:text-black w-full items-center justify-between "
            variant={'ghost'}
            onClick={() => setShowEditDialog((prev) => !prev)}
          >
            <span className="ml-2">Edit</span>
            <Pen className="w-5 h-5" />
          </Button>
        )}

        {Boolean(SendOffer) && (
          <Button
            className="flex my-auto hover:bg-gray-200 text-gray-500 hover:text-black w-full items-center justify-between "
            variant={'ghost'}
            onClick={() => setShowSendOfferDialog((prev) => !prev)}
          >
            <span className="ml-2">Send Offer</span>
            <FileText className="w-5 h-5" />
          </Button>
        )}

        {Boolean(Employ) && (
          <Button
          className="flex my-auto hover:bg-gray-200 text-gray-500 hover:text-black w-full items-center justify-between "
            variant={'ghost'}
            onClick={() => setShowEmployDialog((prev) => !prev)}
          >
            <span className="ml-2">Employ</span>
            <ArrowLeftRight className="w-5 h-5" />
          </Button>
        )}

        {Boolean(Delete) && (
          <Button
            className="flex my-auto  text-gray-500 hover:bg-primary hover:text-white w-full items-center justify-between  "
            variant={'ghost'}
            onClick={() => setShowDeleteDialog((prev) => !prev)}
          >
            <span className="ml-2">Delete</span>
            <Trash2 className="w-5 h-5" />
          </Button>
        )}
        {custom
          ?.filter((item) => item.condition(values))
          .map((item) => (
            <Button
              onClick={() => item.onClick(values)}
              variant={'ghost'}
              className="flex my-auto text-gray-500 hover:bg-gray-200 hover:text-black w-full items-center justify-between "
            >
              {item.title}
              <div>{item.icon && item.icon}</div>
            </Button>
          ))}
        {/* <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>
            <TrashIcon size={12} />
          </DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
