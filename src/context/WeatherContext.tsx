import { createContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { CurrentWeather, ForecastItem, WeatherContextType } from '../types/weather';
import { getWeatherByCity } from '../services/weatherService';

export const WeatherContext = createContext<WeatherContextType | null>(null);

const DEFAULT_CITY = 'Medellin';

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const { weather: weatherData, forecast: forecastData } = await getWeatherByCity(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchCity(DEFAULT_CITY);
  }, [searchCity]);

  const contextValue = useMemo(
    () => ({ weather, forecast, loading, error, searchCity }),
    [weather, forecast, loading, error, searchCity]
  );

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}