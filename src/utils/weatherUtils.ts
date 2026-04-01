export function getWeatherIcon(icon: string): string {
  const iconMap: Record<string, string> = {
    '01d': 'sunny',        '01n': 'clear_night',
    '02d': 'partly_cloudy_day', '02n': 'partly_cloudy_night',
    '03d': 'cloud',        '03n': 'cloud',
    '04d': 'cloudy',       '04n': 'cloudy',
    '09d': 'rainy',        '09n': 'rainy',
    '10d': 'rainy',        '10n': 'rainy',
    '11d': 'thunderstorm', '11n': 'thunderstorm',
    '13d': 'ac_unit',      '13n': 'ac_unit',
    '50d': 'foggy',        '50n': 'foggy',
  };
  return iconMap[icon] ?? 'partly_cloudy_day';
}

export function getWindDirection(deg: number): string {
  const dirs = ['Norte','NNE','NE','ENE','Este','ESE','SE','SSE',
                 'Sur','SSO','SO','OSO','Oeste','ONO','NO','NNO'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('es', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export function getDayName(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return 'Hoy';
  if (date.toDateString() === tomorrow.toDateString()) return 'Mañana';
  return date.toLocaleDateString('es', { weekday: 'short' })
    .replace('.', '')
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function getWeatherGradient(conditionId: number, icon: string): string {
  const isNight = icon.endsWith('n');
  if (isNight) return 'linear-gradient(135deg, #0a0e1a 0%, #1a2744 50%, #0d1b2a 100%)';
  if (conditionId >= 200 && conditionId < 300) return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
  if (conditionId >= 300 && conditionId < 600) return 'linear-gradient(135deg, #1e3a5f 0%, #2d5986 50%, #1e4d8c 100%)';
  if (conditionId >= 600 && conditionId < 700) return 'linear-gradient(135deg, #6b8cae 0%, #89c4e1 50%, #b8e4f5 100%)';
  if (conditionId >= 700 && conditionId < 800) return 'linear-gradient(135deg, #485461 0%, #28313b 50%, #485461 100%)';
  if (conditionId === 800) return 'linear-gradient(135deg, #1e3c72 0%, #2a5298 40%, #4a90d9 100%)';
  return 'linear-gradient(135deg, #2c3e6b 0%, #3d5a8a 50%, #2c4a6e 100%)';
}