import { displayStatus, hideStatus } from "./dom-modules/status-display.js";

const unitKeys = ["us", "metric", "uk", "base"];
const unitList = await fetch("./src/unit-list.json")
  .then((r) => r.json())
  .catch((e) => console.error(e));
let currentUnits = unitKeys[0];

export default async function getWeather(locationSearch, unitIndex) {
  if (typeof unitIndex === "number" && unitIndex >= 0 && unitIndex < 4) {
    currentUnits = unitKeys[unitIndex];
  }
  const request = await requestForecast(locationSearch);

  if (request) {
    const location = request.resolvedAddress;
    const current = reduceProps(request.currentConditions);
    const forecast = request.days.map(reduceProps);
    const units = unitList[currentUnits];

    return { location, current, forecast, units };
  }
}

async function requestForecast(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=KCDTTFSSD3KMXDRP3VE6RB66K&unitGroup=${currentUnits}&iconSet=icons1&include=current`;

  displayStatus("Fetching weather data...");
  const weather = await fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error("Api request failed", { cause: response });
      hideStatus();
      return response.json();
    })
    .catch(async (e) => {
      const cause = await e.cause?.text();
      if (cause) {
        displayStatus(cause);
        console.error(cause);
      }
    });
  return weather;
}

const disallowed = await fetch("./src/unneeded-props.json")
  .then((r) => r.json())
  .catch((e) => console.error(e));

function reduceProps(input, index) {
  const isInIterable = !!index || index === 0;
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
