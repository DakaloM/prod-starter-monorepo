'use client';

import { startCase } from '@imax/utils';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { z } from 'zod';

import { Badge } from '../badge';
import {
  Table as NativeTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../native-table';
import { DataTableColumnHeader } from './DataTableColumnHeader';
import { DataTableRowActions, DataTableRowActionsProps } from './DataTableRowActions';

export function Table<T extends z.AnyZodObject>({
  schema,
  data,
  actions,
  onClick,
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<z.infer<T>>[] = useMemo(() => {
    const cols = Object.keys(schema.shape)
      .map(
        (key) =>
          ({
            id: key,
            accessorKey: key,
            header: ({ column }) => (
              <DataTableColumnHeader column={column} title={startCase(key)} />
            ),
            enableSorting: true,
            enableHiding: false,
          }) as ColumnDef<z.infer<T>>,
      )
      .map((col) => {
        if (col.id?.toLowerCase().includes('date') || col.id === 'createdAt') {
          col.cell = ({ row }) => {
            const dateString = row.original[col.id!];
            if (!dateString) {
              return null;
            }

            const date = new Date(dateString);

            return (
              <span>
                {new Intl.DateTimeFormat('en-ZA', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(date)}
              </span>
            );
          };
        }

        if (col.id?.toLowerCase() === 'status') {
          col.cell = ({ row }) => {
            const status = row.original[col.id!];

            return (
              <Badge
                className={statusLookUp[status]}
                variant={
                  status === ('Approved' || 'Closed')
                    ? 'success'
                    : status === ('Declined' || 'Closed')
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {status}
              </Badge>
            );
          };
        }

        if (col.id?.toLowerCase() === 'outcome') {
          col.cell = ({ row }) => {
            const outcome = row.original[col.id!];

            return (
              <Badge className={outcomeLooUp[outcome]} variant="default">
                {outcome ? outcome : 'Pending'}
              </Badge>
            );
          };
        }

        return col;
      });

    if (actions) {
      cols.push({
        id: 'actions',
        // @ts-ignore
        cell: ({ row }: DataTableRowActionsProps<T>) => {
          return (
            <DataTableRowActions
              row={row}
              Edit={actions.Edit}
              Delete={actions.Delete}
              View={actions.View}
              SendOffer={actions.SendOffer}
              Employ={actions.Employ}
              custom={actions.custom}
            />
          );
        },
      });
    }

    return [
      {
        id: 'select',
        enableSorting: false,
        enableHiding: false,
      },
      ...cols,
    ];
  }, [schema, actions]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card overflow-auto">
        <NativeTable className="w-full overflow-x-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-white">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-2xl bg-gray-100">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={
                        (cell.column.id !== 'actions' &&
                          onClick &&
                          'group-hover:bg-gray-400/10 cursor-pointer') ||
                        ''
                      }
                      onClick={() => cell.column.id !== 'actions' && onClick?.(row.getValue('id'))}
                      key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={Object.keys(schema).length} className="w-full h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </NativeTable>
      </div>
    </div>
  );
}
export interface DataTableProps<T extends z.AnyZodObject> {
  schema: T;
  data: Record<string | number | symbol, any>[];
  actions?: Pick<
    DataTableRowActionsProps<T>,
    'Edit' | 'custom' | 'Delete' | 'View' | 'SendOffer' | 'Employ'
  >;
  onClick?: (id: string | number) => void;
}

const statusLookUp = {
  Open: 'bg-green-600 text-white',
  Closed: 'bg-primary text-white',
  Hearing: 'bg-green-200 text-black',
  Warning: 'bg-red-200 text-black',
  Meeting: 'bg-yellow-200 text-black',
} as Record<string, string>;

const outcomeLooUp = {
  Average: 'bg-secondary text-white hover:bg-secondary',
  Excellent: 'bg-green-600 text-white hover:bg-green-600',
  AboveAverage: 'bg-green-400 text-white hover:bg-green-400',
  BelowAverage: 'bg-red-400 text-white hover:bg-red-400',
  Poor: 'bg-destructive text-white hover:bg-destructive',
  Pending: 'bg-gray-500 text-white hover:bg-gray-500',
} as Record<string, string>;
