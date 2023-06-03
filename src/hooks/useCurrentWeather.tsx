import { useCallback, useEffect, useState } from 'react';
import { WeatherApi } from '../api/WeatherApi';
import { Weather } from '../types/types';

export const useCurrentWeather = (location: string, skip?: boolean) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeather = useCallback(async (): Promise<void> => {
    const { data } = await WeatherApi.getCurrentWeather(location);
    setWeather(data);
  }, [location]);

  useEffect(() => {
    if (!skip) {
      getWeather();
    }
  }, [getWeather, location, skip]);

  return weather;
};
