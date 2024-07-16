const units = ["us", "metric", "uk", "base"];
let currentUnit = units[0];

export default async function getWeather(locationSearch, unitIndex) {
  if (typeof unitIndex === "number" && unitIndex >= 0 && unitIndex < 4) {
    currentUnit = units[unitIndex];
  }
  const request = await requestForecast(locationSearch);

  const location = request.resolvedAddress;
  const current = reduceProps(request.currentConditions);
  const forecast = request.days.map(reduceProps);
  const unit = currentUnit;

  return { current, forecast, location, unit };
}

async function requestForecast(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KCDTTFSSD3KMXDRP3VE6RB66K&unitGroup=${currentUnit}&include=current`;

  try {
    const weather = await fetch(url).then((response) => response.json());
    return weather;
  } catch (e) {
    console.log(e);
  }
}

const disallowed = await fetch("../unneeded-props.json").then((r) => r.json());

function reduceProps(input, index) {
  // false if index is nullish or -1, true even when 0
  // should never be -1 unless passed manually, could use a ternary if I cared enough i guess
  const isInIterable = !!((index ?? -1) + 1);
  const output = {};
  for (const k in input) {
    if (
      disallowed[k] === true ||
      (disallowed[k] === "forecast" && isInIterable)
    ) {
      continue;
    }
    output[k] = input[k];
  }
  return output;
}
