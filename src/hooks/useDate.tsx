import { MONTH_DAYS, WEEK_DAYS } from '../constants';

export interface UseDate {
  day: string;
  week: string;
  month: string;
}

export const useDate = (date: string): UseDate => {
  const dateObj = new Date(date);

  const week = WEEK_DAYS[dateObj.getDay()];
  const number = dateObj.getDate();
  const day = number < 10 ? `0${number}` : `${number}`;
  const month = MONTH_DAYS[dateObj.getMonth()];

  return { day, week, month };
};
