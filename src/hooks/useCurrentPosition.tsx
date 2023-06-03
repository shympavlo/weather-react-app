import { useEffect, useState } from 'react';
import { GetLocationResponse } from '../types/types';

export const useCurrentPosition = (): string => {
  const [location, setLocation] = useState<string>('');
  const successCallback = (position: GetLocationResponse) => {
    if (
      position &&
      position.coords &&
      position.coords.latitude &&
      position.coords.longitude
    ) {
      setLocation(`${position.coords.latitude},${position.coords.longitude}`);
    }
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return location;
};
