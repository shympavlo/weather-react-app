import { AxiosPromise } from 'axios';
import { Api } from './Api';
import { API_KEY } from './constants';
import { SeacrhWeatherData, Weather } from '../types/types';

export class WeatherApi {
  static getCurrentWeather = (location: string): AxiosPromise<Weather> => {
    return Api.get(`/forecast.json?key=${API_KEY}&q=${location}&days=7`);
  };
  static search = (searchValue: string): AxiosPromise<SeacrhWeatherData[]> => {
    return Api.get(`/search.json?key=${API_KEY}&q=${searchValue}`);
  };
}
