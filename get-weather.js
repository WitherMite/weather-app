export default async function getWeather(locationSearch) {
  const request = await requestForecast(locationSearch);
  console.log(request);

  const location = request.resolvedAddress;
  const current = reduceCurrentWeather(request.currentConditions);
  const forecast = request.days.map(reduceDay);

  // reduce request to needed properties

  return { current, forecast, location };
}

async function requestForecast(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KCDTTFSSD3KMXDRP3VE6RB66K&include=current`;

  try {
    const weather = await fetch(url).then((response) => response.json());
    return weather;
  } catch (e) {
    console.log(e);
  }
}

// TODO: pass through needed properties after designing webpage

function reduceDay(day) {}

function reduceCurrentWeather(weather) {}
