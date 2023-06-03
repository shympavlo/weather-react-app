import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';
import { useCurrentWeather } from '../../hooks/useCurrentWeather';
import { WeatherItem } from '../../components/WeatherItem';
import { SeacrhInput } from '../../components/SearchInput';
import { useSearch } from '../../hooks/useSearch';
import styles from './index.module.css';
import { SearchedItem } from '../../components/SearchedItem';

export const Main: React.FC = () => {
  const location = useCurrentPosition();
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [showItems, setShowItems] = useState<boolean>(false);

  const searchedData = useSearch(searchValue);
  const weather = useCurrentWeather(selectedRegion || location, !location);

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const onFocus = (): void => {
    setShowItems(true);
  };

  const onBlur = (): void => {
    setTimeout(() => {
      setShowItems(false);
    }, 1000);
  };

  const onChangeRegion = (
    lat: number,
    lon: number,
    searchValue: string,
  ): void => {
    setSelectedRegion(`${lat},${lon}`);
    setSearchValue(searchValue);
  };

  useEffect(() => {
    if (!searchValue && selectedRegion) {
      setSelectedRegion('');
    }
  }, [searchValue, selectedRegion]);

  if (!weather) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.input}>
        <SeacrhInput
          onBlur={onBlur}
          onFocus={onFocus}
          value={searchValue}
          onChange={onChangeSearchValue}
        />
        {!!searchedData?.length && showItems ? (
          <div className={styles.searchedData}>
            <h4>Search Result</h4>
            {searchedData.map((item) => (
              <SearchedItem
                onSelect={() =>
                  onChangeRegion(
                    item.lat,
                    item.lon,
                    `${item.name}, ${item.region}, ${item.country}`,
                  )
                }
                key={item.name + item.region + item.country}
                name={item.name}
                region={item.region}
                country={item.country}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className={styles.header}>
        <img
          src={weather.current.condition.icon}
          alt="weather image condition"
        />
        <h1>{weather.location.name}</h1>
        <h2 className={styles.temp}>{weather.current.temp_c.toFixed(0)}°</h2>
      </div>
      <div className={styles.container}>
        {weather.forecast.forecastday.map((item, index: number) => (
          <WeatherItem
            key={index}
            date={item.date}
            minTemp={`${
              item.day.mintemp_c >= 0 ? '+' : '-'
            }${item.day.mintemp_c.toFixed(0)}°`}
            maxTemp={`${
              item.day.maxtemp_c >= 0 ? '+' : '-'
            }${item.day.maxtemp_c.toFixed(0)}°`}
            conditionIcon={item.day.condition.icon}
            conditionText={item.day.condition.text}
          />
        ))}
      </div>
    </div>
  );
};
