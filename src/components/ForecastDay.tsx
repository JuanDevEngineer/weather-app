import { memo } from "react";
import type { ForecastItem } from "../types/weather";
import { getWeatherIcon, getDayName } from "../utils/weatherUtils";

interface ForecastDayProps {
  item: ForecastItem;
  isToday?: boolean;
}

export const ForecastDay = memo(function ForecastDay({ item, isToday = false }: ForecastDayProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-lg p-3 transition-colors ${
        isToday ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-white/10"
      }`}
    >
      <p className="font-bold">{getDayName(item.date)}</p>
      <span className="material-symbols-outlined !text-4xl" aria-hidden="true">
        {getWeatherIcon(item.icon)}
      </span>
      <p className="font-bold">{item.tempMax}°</p>
      <p className="text-sm text-white/70">{item.tempMin}°</p>
    </div>
  );
});
