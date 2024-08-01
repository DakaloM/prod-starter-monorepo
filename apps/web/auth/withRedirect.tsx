import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function withRedirect<T extends Object = {}>(Component: React.FC<T>, isAuthRoute = false) {
  return function PageWithRedirect(props: T) {
    const token = cookies().get('token');
    const refreshToken = cookies().get('refresh_token');
    
    // if (isAuthRoute && token) {
    //   redirect('/');
    // }

    const noAuth = !isAuthRoute && !token;

    if (noAuth) {
      redirect('/login');
    }

    return <Component {...props} />;
  };
}
