import { NextResponse } from 'next/server';
import { apiClient } from '~/client/index';

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    const response = (await apiClient[body.name]?.(body.input)) || {};

    return NextResponse.json(response);
  } catch (error) {
    const errors: ApiError[] = error.response?.errors || [];

    if (!errors.length) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      errors.map<ResponseError>((e) => ({
        message: e.message,
        path: e.extensions.path,
      })),
      { status: 400 },
    );
  }
};

export type ApiError = {
  message: string;
  extensions: {
    code: string;
    path: string[];
  };
};

export type ResponseError = {
  message: string;
  path: string[];
};
