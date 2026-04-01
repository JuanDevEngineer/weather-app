import { useWeather } from "../hooks/useWeather";
import { DetailCard } from "./DetailCard";

export function WeatherDetailsGrid() {
  const { weather } = useWeather();
  if (!weather) return null;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <DetailCard
        icon="air"
        value={`${weather.windSpeed} km/h`}
        label="Viento"
      />
      <DetailCard
        icon="water_drop"
        value={`${weather.humidity}%`}
        label="Humedad"
      />
      <DetailCard
        icon="wb_sunny"
        value={String(weather.uvIndex)}
        label="Índice UV"
      />
      <DetailCard
        icon="visibility"
        value={`${weather.visibility} km`}
        label="Visibilidad"
      />
    </div>
  );
}
