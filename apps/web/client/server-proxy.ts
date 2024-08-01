import { ApiClient } from '@imax/client';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const { CLIENT_ID, CLIENT_SECRET, API_URL } = process.env as Record<string, string>;

export const apiClient = new ApiClient(
  {
    baseURL: API_URL,
    clientId: CLIENT_ID,
    secret: CLIENT_SECRET,
  },
  cookies,
);

export type ClientFunctions = {
  [K in keyof ApiClient]: ApiClient[K] extends (...args: any[]) => any ? K : never;
}[keyof ApiClient];

const echo: Mapper<any> = (data: any) => data;

export function createProxy<T = any>(key: ClientFunctions, mapper: Mapper<T> = echo) {
  return async (request: Request) => {
    const body = await request.json();

    const data = mapper(body);

    const response = (await apiClient[key](data)) || {};

    return NextResponse.json(response);
  };
}

type Mapper<T, R = any> = (data: T) => R;
