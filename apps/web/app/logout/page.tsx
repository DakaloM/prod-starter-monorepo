'use client';

import { Loader } from '@imax/ui';

import { useEffect } from 'react';

export default function RootLayout() {
  useEffect(() => {
    fetch('/api/logout', {
      method: 'POST',
    }).then(() => {
      window.location.replace('/');
    });
  }, []);

  return (
    <div className="h-screen w-screen absolute top-0 grid place-items-center">
      <Loader />
    </div>
  );
}
