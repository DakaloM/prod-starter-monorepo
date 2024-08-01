'use client';

import { Button, Loader, useToast } from '@imax/ui';

import { delay } from 'lodash';
import { MailIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { executeApi } from '~/client/api';

const ConfirmEmailPage = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  const { toast } = useToast();

  if (!token) {
    return null;
  }

  const handleConfirm = async () => {
    setLoading(true);
    try {
     
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Email confirmed successfully',
      });
      delay(() => {
        router.push('/login');
      }, 200);
      setLoading(false);
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Error',
        description: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      {loading ? (
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col w-full md:w-[500px] h-[250px] justify-center items-center">
          <Loader className="w-24 h-24" />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full md:w-[500px] h-[250px]">
          <MailIcon className="w-16 h-16 text-primary mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Confirm Your Email</h1>
          <p className="text-gray-600 text-center mb-6">
            Please click the button below to confirm your email.
          </p>

          <Button onClick={handleConfirm}>Confirm Email</Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmailPage;
