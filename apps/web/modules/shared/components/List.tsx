'use client';

import { Button, DataTableProps, Input, Table } from '@imax/ui';

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { z } from 'zod';
import { useParams } from '~/modules/search/hooks/params';

export interface PageProps {
  page: number;
  count: number;
}
export interface ListProps<T extends z.AnyZodObject> extends DataTableProps<T> {
  data: z.infer<T>[];
  schema: T;
  onItemSelect: (obj: z.infer<T>) => void;
}

export function List<T extends z.AnyZodObject>({
  data,
  schema,
  onItemSelect,
  actions,
}: ListProps<T>) {
  const params = useParams();

  const values = params.getValues(['page', 'count']);

  const page = Number.parseInt(values.page || '1');
  const count = Number.parseInt(values.count || '20');
  const [currentPage, setCurrentPage] = useState(page);

  const items = useMemo(() => {
    const map = new Map<number, z.infer<T>>();
    data.forEach((item) => {
      map.set(Number(item.sequence), item);
    });

    return map;
  }, [data]);


  const handleClick = (seq: string) => {
    const item = items.get(Number(seq));
    if (!item) {
      return console.log('item not found');
    }

    onItemSelect(item);
  };

  const tableData = data.map((item) => ({
    ...item,
    id: item.sequence ?? item.id,
  }));

  const goToPage = (page: number) => {
    if (page < 1 || page > count || isNaN(page)) {
      return;
    }

    setCurrentPage(page);
    params.change({ page, count });
  };

  return (
    <section className="grid w-full gap-4">
      <Table schema={schema} data={tableData} onClick={handleClick} actions={actions} />
      <div className="w-full grid justify-center">
        <div className="flex gap-4 place-items-center w-full">
          <Button onClick={() => goToPage(1)} disabled={currentPage === 1} size="sm">
            <ChevronFirst size={14} />
          </Button>
          <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} size="sm">
            <ChevronLeft size={14} />
          </Button>
          <Input
            className="w-12"
            value={currentPage}
            onChange={(e) => setCurrentPage(+e.currentTarget.value)}
            onKeyUp={(e) => e.code === 'Enter' && goToPage(+e.currentTarget.value)}
          />
          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= count - 1 || data.length < count}
            size="sm"
          >
            <ChevronRight size={14} />
          </Button>
          <Button
            onClick={() => goToPage(+count)}
            disabled={currentPage === +count || data.length < count}
            size="sm"
          >
            <ChevronLast size={14} />
          </Button>
        </div>
      </div>
    </section>
  );
}
