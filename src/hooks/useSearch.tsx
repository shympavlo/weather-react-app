import { useEffect, useState, useCallback } from 'react';
import { WeatherApi } from '../api/WeatherApi';
import { SeacrhWeatherData } from '../types/types';

export const useSearch = (searchValue: string): SeacrhWeatherData[] | null => {
  const [searchData, setSearchedData] = useState<SeacrhWeatherData[]>([]);

  const getSearchedData = useCallback(async (): Promise<void> => {
    const { data } = await WeatherApi.search(searchValue);
    setSearchedData(data);
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      getSearchedData();
    }
  }, [getSearchedData, searchValue]);

  return searchData;
};
