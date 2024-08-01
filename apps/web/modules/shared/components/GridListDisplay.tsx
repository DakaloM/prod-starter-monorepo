'use client';

import { LucideIcon } from 'lucide-react';
import React from 'react';
import { z } from 'zod';
import { Search } from '~/modules/search';

import { List, ListProps } from './List';

export interface ListDisplayProps<T extends z.AnyZodObject> extends ListProps<T> {
  Create?: React.FC;
  Actions?: React.FC;
  hideSearch?:boolean;
  Icon?: LucideIcon;
  title: string;
}

export function ListDisplay<T extends z.AnyZodObject>({
  data,
  schema,
  onItemSelect,
  Create,
  Icon,
  title,
  actions,
  Actions = () => null,
  hideSearch
}: ListDisplayProps<T>) {
  return (
    <div className="flex flex-col py-4 pb-8  px-2 md:px-8 shadow-sm border  w-full h-full overflow-x-auto scrollBar-hide rounded-lg gap-8 ">
      <div className="flex gap-4 place-items-center border-b-2 pb-4">
        {Icon && <Icon className="bg-primary rounded-lg p-2 text-white" size={38} />}
        <span className="text-md font-semibold">{title}</span>
      </div>
      <div className="flex flex-col gap-10 ">
        <div className="flex flex-col-reverse md:flex-row gap-4 items-center w-full justify-between">
          {hideSearch !== true && <div className="flex items-center gap-4">
            <Search placeHolder="Search" />
          </div>}
          {Create && <Create />}
        </div>
        <div className="flex justify-between bg-black">
          <Actions/>
        </div>
        <List data={data} schema={schema} onItemSelect={onItemSelect} actions={actions} />
      </div>
    </div>
  );
}
