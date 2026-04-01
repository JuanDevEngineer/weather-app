import { useState, type KeyboardEvent } from "react";
import { useWeather } from "../hooks/useWeather";

export function Header() {
  const [query, setQuery] = useState<string>("");
  const { searchCity, loading } = useWeather();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      void searchCity(trimmed);
      setQuery("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-white">
        <span className="material-symbols-outlined text-3xl">
          partly_cloudy_day
        </span>
        <h1 className="text-xl font-bold">Weather</h1>
      </div>
      <div className="w-full max-w-sm">
        <label className="relative flex h-12 w-full items-center">
          <span className="material-symbols-outlined absolute left-4 text-white/70">
            search
          </span>
          <input
            className="form-input h-full w-full rounded-full border-none bg-white/10 pl-12 pr-12 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Buscar ciudad..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          {query && (
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute right-4 text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </button>
          )}
        </label>
      </div>
    </header>
  );
}
