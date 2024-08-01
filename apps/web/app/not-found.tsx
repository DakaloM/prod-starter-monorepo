'use client';

import { Button } from '@imax/ui';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import maintenance from '~/assets/website-maintenance.png'

const NotFound = () => {

  const router = useRouter()

  return (
    <div className='w-full flex flex-col items-center justify-center h-screen gap-8'>
      <h1 className='text-5xl font-extrabold'>Coming <span className='text-primary'>Soon</span></h1>
      <Image
        height={500}
        width={500}
        src={maintenance}
        alt='Maintenance'
      />

      <Button onClick={() => router.back()} variant={"ghost"} className='hover:bg-gray-300 flex items-center justify-center w-64 gap-4'>
        <ChevronLeft size={30} className='text-gray-500'/>
        <p className='text-xl text-gray-500'>Go back</p>
      </Button>
    </div>
  )
}

export default NotFound
