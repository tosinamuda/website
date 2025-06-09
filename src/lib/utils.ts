// lib/utils.ts

import { parseISO, format, isValid } from 'date-fns';

/**
 *
 * @param inputDateString input in this string format e.g '2021-11-24T18:34:05';
 * @return output date in this format 'dd MMM, yyyy' e.g 11 Sep, 2021
 */

export const getHumanFriendlyDate = (inputDateString: string) =>
  format(new Date(inputDateString), 'dd MMM, yyyy');

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);

    if (!isValid(date)) {
      throw new Error('Invalid date');
    }

    return format(date, 'MMMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return dateString || 'Recent';
  }
}
