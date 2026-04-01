export interface CurrentWeather {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  uvIndex: number;
  sunrise: number;
  sunset: number;
  condition: string;
  description: string;
  icon: string;
  conditionId: number;
}

export interface ForecastItem {
  date: number;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  conditionId: number;
}

export interface WeatherContextType {
  weather: CurrentWeather | null;
  forecast: ForecastItem[];
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
}