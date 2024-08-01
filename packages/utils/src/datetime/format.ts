import { format } from 'date-fns';

export function formatDateWithType(date: Date | number, type: string): string {
  return format(date, type);
}