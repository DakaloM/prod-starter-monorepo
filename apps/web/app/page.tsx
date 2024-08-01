import { UserRole } from '@imax/client';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


import { apiClient } from '../client';

export default async function Page(props: Props) {
  const { searchParams } = props;

  const token = cookies().get('token');

  const profile = token && (await apiClient.profile());
  if (token && profile) {
    if (profile?.role !== UserRole.Applicant) {
      redirect('/dashboard');
    }
  }


  return (
    <div className="flex flex-col items-center py-10 gap-8 w-full lg:p-8">
     

      <h1 className="text-xl font-bold underline text-gray-500 ">Job feed</h1>
      
    </div>
  );
}

interface Props {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
