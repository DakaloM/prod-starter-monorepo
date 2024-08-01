'use client'

import { Toaster } from '@imax/ui';
import dynamic from 'next/dynamic';

const DynamicToaster = dynamic(() => import('@imax/ui').then((mod) => mod.Toaster), {
  ssr: false,
});

export const Toast = ({children} : any) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <Toaster />
      {children}
    </div>
  );
};

