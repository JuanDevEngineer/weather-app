import { useWeather } from "../hooks/useWeather";
import { DetailCard } from "./DetailCard";
import { formatTime, getWindDirection } from "../utils/weatherUtils";

export function AdditionalInfo() {
  const { weather } = useWeather();
  if (!weather) return null;

  return (
    <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-4 lg:gap-8">
      <DetailCard
        icon="wb_twilight"
        value={formatTime(weather.sunrise)}
        label="Amanecer"
      />
      <DetailCard
        icon="nights_stay"
        value={formatTime(weather.sunset)}
        label="Atardecer"
      />
      <DetailCard
        icon="thermostat"
        value={`${weather.feelsLike}°`}
        label="Sensación térmica"
      />
      <DetailCard
        icon="navigation"
        value={getWindDirection(weather.windDeg)}
        label="Dir. del Viento"
      />
    </div>
  );
}
