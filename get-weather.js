export default async function getWeather(locationSearch) {
  const request = await requestForecast(locationSearch);
  console.log(request);
  const current = reduceCurrentWeather(request.current);
  const location = reduceLocation(request.location);
  const forecast = request.forecast.forecastday.map(reduceForecastDay);

  return { current, forecast, location };
}

async function requestForecast(location) {
  const link =
    "http://api.weatherapi.com/v1/forecast.json?key=2965c6b027c24232bdd203628240707&days=3";
  const search = "&q=" + location;
  const url = link + search;

  try {
    const weather = await fetch(url).then((response) => response.json());
    return weather;
  } catch (e) {
    console.log(e);
  }
}

// TODO: pass through needed properties after designing webpage

function reduceForecastDay(day) {}

function reduceCurrentWeather(current) {}

function reduceLocation(location) {}
