const API_KEY = 'ENTER YOUR API KEY HERE';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

// Based on the API doc at https://openweathermap.org/current#current_JSON
interface CurrentWeatherResponse {
  cod: number;
  message?: string;
  coord: {
    lon: number;
    lat: number;
  };
  // Complete this interface based on the API docs
}

async function fetchJson(url: any) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getWeatherIcon(icon: any) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export interface CurrentWeather {
  icon: string;
  description: string;
  temperature: number;
}

export async function getCurrentWeatherByCity(cityName: any): Promise<CurrentWeather> {
  // Make sure any special characters are encoded in the city name
  const encodedCity = encodeURIComponent(cityName);
  const finalUrl = `${API_URL}&q=${encodedCity}`;
  
  const weatherData = await fetchJson(finalUrl);
  if (weatherData.cod !== 200) {
    throw new Error(weatherData.message || 'Unknown error');
  }

  const weatherInfo = weatherData.weather[0];
  const icon = getWeatherIcon(weatherInfo.icon);
  const description = weatherInfo.description;
  const temperature = weatherData.main.temp;

  return {
    icon,
    description,
    temperature,
  };
}