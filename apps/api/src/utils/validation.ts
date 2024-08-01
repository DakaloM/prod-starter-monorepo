import { Validator } from '@imax/serverkit';
import z from 'zod';
import { Context } from '~/context';

export function withResolverValidation<T, R>(resolver: Resolver<T, R>, schema: Schema) {
  const validator = new Validator(schema);

  return async function validate(params: T, ctx: Context) {
    const data = validator.parse(params) as T;

    return resolver(data, ctx);
  };
}

type Schema = z.AnyZodObject | z.ZodEffects<z.AnyZodObject> | z.ZodString;

type Resolver<T, R> = (params: T, ctx: Context) => Promise<R>;
