export default async function getForecast(locationSearch) {
  const request = await requestWeather(locationSearch);
  console.log(request);
  const current = reduceCurrentWeather(request.current);
  const location = reduceLocation(request.location);
  const forecast = request.forecast.forecastday.map(reduceForecastDay);

  const weather = { current, forecast, location };
  return weather;
}

async function requestWeather(location) {
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

function reduceForecastDay(day) {}

function reduceCurrentWeather(current) {}

function reduceLocation(location) {}
