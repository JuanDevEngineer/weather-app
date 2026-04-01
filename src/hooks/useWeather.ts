import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import type { WeatherContextType } from '../types/weather';

export function useWeather(): WeatherContextType {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather debe usarse dentro de <WeatherProvider>');
  }
  return context;
}