import { WeatherProvider } from "./context/WeatherContext";
import { useWeather } from "./hooks/useWeather";
import { getWeatherGradient } from "./utils/weatherUtils";
import { Header } from "./components/Header";
import { MainWeatherCard } from "./components/MainWeatherCard";
import { WeatherDetailsGrid } from "./components/WeatherDetailsGrid";
import { ForecastSection } from "./components/ForecastSection";
import { AdditionalInfo } from "./components/AdditionalInfo";

function WeatherApp() {
  const { weather, loading, error } = useWeather();

  const gradient = weather
    ? getWeatherGradient(weather.conditionId, weather.icon)
    : "linear-gradient(135deg, #1e3c72 0%, #2a5298 40%, #4a90d9 100%)";

  return (
    <div
      className="font-display relative flex min-h-screen w-full flex-col items-center p-4 sm:p-6 md:p-8 transition-all duration-1000"
      style={{ background: gradient }}
    >
      <div className="relative z-10 w-full max-w-6xl">
        <Header />

        {loading && (
          <div className="flex h-96 items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-white">
              <span className="material-symbols-outlined animate-spin text-5xl">
                sync
              </span>
              <p className="text-lg">Cargando datos del clima...</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="flex h-96 items-center justify-center">
            <div className="glassmorphism flex flex-col items-center gap-4 rounded-xl p-8 text-white shadow-glass">
              <span className="material-symbols-outlined text-5xl text-red-300">
                error
              </span>
              <p className="text-lg text-center max-w-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && weather && (
          <main className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <MainWeatherCard />
            <WeatherDetailsGrid />
            <ForecastSection />
            <AdditionalInfo />
          </main>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
