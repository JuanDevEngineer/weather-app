import type { CurrentWeather, ForecastItem } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface OWMWeatherEntry {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface OWMCurrentResponse {
  coord: { lat: number; lon: number };
  weather: OWMWeatherEntry[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: { speed: number; deg: number };
  visibility: number;
  sys: { country: string; sunrise: number; sunset: number };
  name: string;
}

interface OWMForecastList {
  dt: number;
  main: { temp_max: number; temp_min: number };
  weather: OWMWeatherEntry[];
}

interface OWMForecastResponse {
  list: OWMForecastList[];
}

interface OWMUVResponse {
  value: number;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404)
      throw new Error('Ciudad no encontrada. Verifica el nombre e intenta de nuevo.');
    if (response.status === 401)
      throw new Error('API key inválida. Revisa el archivo .env y agrega tu VITE_OPENWEATHER_API_KEY.');
    throw new Error(`Error del servidor (${response.status}). Intenta más tarde.`);
  }
  return response.json() as Promise<T>;
}

function mapCurrentWeather(data: OWMCurrentResponse, uvIndex = 0): CurrentWeather {
  return {
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    windDeg: data.wind.deg ?? 0,
    visibility: Math.round(data.visibility / 1000),
    uvIndex,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    conditionId: data.weather[0].id,
  };
}

function aggregateDailyForecast(list: OWMForecastList[]): ForecastItem[] {
  const dailyMap = new Map<string, { temps: number[]; conditions: OWMWeatherEntry[] }>();

  list.forEach((item) => {
    const key = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!dailyMap.has(key)) dailyMap.set(key, { temps: [], conditions: [] });
    const entry = dailyMap.get(key)!;
    entry.temps.push(item.main.temp_max, item.main.temp_min);
    entry.conditions.push(item.weather[0]);
  });

  const today = new Date().toISOString().split('T')[0];

  return Array.from(dailyMap.entries())
    .filter(([key]) => key >= today)
    .slice(0, 5)
    .map(([key, { temps, conditions }]) => {
      const mid = conditions[Math.floor(conditions.length / 2)];
      return {
        date: new Date(key).getTime() / 1000,
        tempMax: Math.round(Math.max(...temps)),
        tempMin: Math.round(Math.min(...temps)),
        condition: mid.main,
        icon: mid.icon,
        conditionId: mid.id,
      };
    });
}

export async function getWeatherByCity(
  city: string
): Promise<{ weather: CurrentWeather; forecast: ForecastItem[] }> {
  const [currentData, forecastData] = await Promise.all([
    fetchJSON<OWMCurrentResponse>(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&APPID=${API_KEY}&units=metric`
    ),
    fetchJSON<OWMForecastResponse>(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&APPID=${API_KEY}&units=metric`
    ),
  ]);

  let uvIndex = 0;
  try {
    const uv = await fetchJSON<OWMUVResponse>(
      `${BASE_URL}/uvi?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${API_KEY}`
    );
    uvIndex = Math.round(uv.value);
  } catch {
    // no crítico
  }

  return {
    weather: mapCurrentWeather(currentData, uvIndex),
    forecast: aggregateDailyForecast(forecastData.list),
  };
}