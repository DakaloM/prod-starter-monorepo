import { db } from './migrate';

export async function handler(event: Event) {
  try {
    return await db.seed.run();
  } catch (error) {
    return {
      error,
      __dirname: __dirname,
    };
  }
}

export interface Event {
  mode: 'ROLLBACK' | 'MIGRATE';
}
