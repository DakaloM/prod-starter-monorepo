import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useParams = () => {
  const params = useSearchParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const getValues = useCallback(
    <T extends string>(values: T[]) => {
      const result: Record<T, string> = {} as any;
      values.forEach((value) => {
        result[value] = params.get(value) || '';
      });
      return result;
    },
    [params],
  );

  const change = useCallback(
    (values: Record<string, string | number>) => {
      const keys = Object.keys(values);
      const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form
      keys.forEach((key) => {
        const v = values[key];
        const value = v.toString().trim();
        if (!value) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      // cast to string
      const search = current.toString();
      // or const query = `${'?'.repeat(search.length && 1)}${search}`;
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    },
    [pathname, router, searchParams],
  );

  return {
    change,
    getValues,
  };
};
