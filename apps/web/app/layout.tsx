import '@imax/ui/globals.css';

import { cookies } from 'next/headers';
import { apiClient } from '~/client/server-proxy';
import { PublicTopNav, Toast } from '~/modules/shared/';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white overflow-x-hidden"
        suppressHydrationWarning={true}
      >
        <Content>{children}</Content>
      </body>
    </html>
  );
}
async function Content({ children }: any) {
  const token = cookies().get('token');
  const profile = token ? await apiClient.profile() : undefined;

  return (
    <div className="flex flex-nowrap flex-col w-screen h-screen bg-gray-100 p-0">
      <PublicTopNav profile={profile} />

      <div className="w-full h-full overflow-y-auto">
        <Toast>{children}</Toast>
      </div>
    </div>
  );
}
