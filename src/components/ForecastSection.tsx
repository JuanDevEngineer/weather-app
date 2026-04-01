import { useWeather } from "../hooks/useWeather";
import { ForecastDay } from "./ForecastDay";

export function ForecastSection() {
  const { forecast } = useWeather();
  if (!forecast.length) return null;

  return (
    <div className="glassmorphism col-span-1 rounded-xl p-6 text-white shadow-glass lg:col-span-3">
      <h3 className="mb-4 text-lg font-bold">Pronóstico de 5 días</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {forecast.map((item, index) => (
          <ForecastDay key={item.date} item={item} isToday={index === 0} />
        ))}
      </div>
    </div>
  );
}
