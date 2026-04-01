import { useWeather } from "../hooks/useWeather";
import { getWeatherIcon } from "../utils/weatherUtils";

export function MainWeatherCard() {
  const { weather } = useWeather();
  if (!weather) return null;

  return (
    <div className="glassmorphism col-span-1 flex flex-col items-center justify-center rounded-xl p-6 text-center text-white shadow-glass lg:col-span-2">
      <span className="material-symbols-outlined !text-9xl text-white text-shadow drop-shadow-lg">
        {getWeatherIcon(weather.icon)}
      </span>
      <h2 className="text-8xl font-black tracking-tighter text-shadow -mt-4">
        {weather.temp}°
      </h2>
      <p className="text-2xl font-bold tracking-tight text-shadow capitalize">
        {weather.description}
      </p>
      <p className="mt-1 text-lg text-white/80">
        {weather.city}, {weather.country}
      </p>
      <div className="mt-2 flex gap-4 text-lg text-white/80">
        <span>H: {weather.tempMax}°</span>
        <span>L: {weather.tempMin}°</span>
      </div>
    </div>
  );
}
