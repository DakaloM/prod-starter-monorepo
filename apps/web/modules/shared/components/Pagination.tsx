'use client';

import { Button, Input } from '@imax/ui';

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from '~/modules/search/hooks/params';

export const Pagination = ({ list }: PaginationProps) => {
  const params = useParams();

  const values = params.getValues(['page', 'count']);

  const page = Number.parseInt(values.page || '1');
  const count = Number.parseInt(values.count || '20');
  const [currentPage, setCurrentPage] = useState(page);
  const goToPage = (page: number) => {
    if (page < 1 || page > count || isNaN(page)) {
      return;
    }

    setCurrentPage(page);
    params.change({ page, count });
  };
  return (
    <div className="w-full grid justify-center py-4">
      <div className="flex gap-4 place-items-center w-full">
        <Button onClick={() => goToPage(1)} disabled={currentPage === 1} size="sm">
          <ChevronFirst size={14} />
        </Button>
        <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} size="sm">
          <ChevronLeft size={14} />
        </Button>
        <Input
          className="w-12 text-center"
          value={currentPage}
          onChange={(e) => setCurrentPage(+e.currentTarget.value)}
          onKeyUp={(e) => e.code === 'Enter' && goToPage(+e.currentTarget.value)}
        />
        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= count - 1 || list.length < count}
          size="sm"
        >
          <ChevronRight size={14} />
        </Button>
        <Button
          onClick={() => goToPage(+count)}
          disabled={currentPage === +count || list.length < count}
          size="sm"
        >
          <ChevronLast size={14} />
        </Button>
      </div>
    </div>
  );
};

type PaginationProps = {
  list: any[];
};
