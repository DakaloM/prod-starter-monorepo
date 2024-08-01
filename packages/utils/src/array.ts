/**
 * Converts a value to an array
 *
 * @param value -  value to convert to an array
 * @returns an array
 */
export const getArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export function uniqueArray(value: string, index: number | string, array: string[]) {
  return array.indexOf(value) === index;
}
