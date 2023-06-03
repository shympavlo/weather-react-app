import React from 'react';
import { ForecastdayEntity } from '../../types/types';
import styles from './index.module.css';
import { useDate } from '../../hooks/useDate';

interface Props extends Pick<ForecastdayEntity, 'date'> {
  maxTemp: string;
  minTemp: string;
  conditionIcon: string;
  conditionText: string;
}

export const WeatherItem: React.FC<Props> = ({
  date,
  minTemp,
  maxTemp,
  conditionIcon,
  conditionText,
}) => {
  const { day, week, month } = useDate(date);
  return (
    <div className={styles.container}>
      <strong>{week}</strong>
      <strong>{day}</strong>
      <strong>{month}</strong>
      <p className={styles.conditionText}>{conditionText}</p>
      <img src={conditionIcon} alt="weather image condition" />
      <p>
        Min: <strong>{minTemp}</strong>
      </p>
      <p>
        Max: <strong>{maxTemp}</strong>
      </p>
    </div>
  );
};
