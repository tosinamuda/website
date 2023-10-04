import { format } from 'date-fns';

/**
 *
 * @param inputDateString input in this string format e.g '2021-11-24T18:34:05';
 * @return output date in this format 'dd MMM, yyyy' e.g 11 Sep, 2021
 */

export const getHumanFriendlyDate = (inputDateString: string) => format(new Date(inputDateString), 'dd MMM, yyyy');
