'use client';

import { Button, Input } from '@imax/ui';

import { SearchIcon } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from '~/modules/search/hooks/params';

interface SearchProps {
  placeHolder: string;
}

export function Search({ placeHolder }: SearchProps) {
  const params = useParams();

  const values = params.getValues(['search']);
  const [search, setSearch] = useState(values.search);

  const onSearch = useCallback(() => params.change({ search }), [params, search]);

  const ref = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="relative border border-gray-200 py-1 px-4 shadow-md bg-white rounded-md flex items-center  gap-2 w-full">
      <Input
        onChange={(e) => {
          const v = e.currentTarget.value;
          setSearch(v);
        }}
        onKeyDown={(e) => {
          if (e.code.toLowerCase() === 'enter') {
            onSearch();
          }
        }}
        ref={ref}
        placeholder={placeHolder}
        value={search}
        className="w-[90%] bg-transparent border-none "
      />
      <Button onClick={() => onSearch()} variant="link">
        <SearchIcon size={20} className=" right-1 top-2 text-[#d13b3b !important]" />
      </Button>
    </div>
  );
}
