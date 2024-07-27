import { formatDate } from "./date-helpers.js";
import {
  clearDiv,
  createDataField,
  createContainerDiv,
  createPopoutBtn,
} from "./dom-helpers.js";
import initDropdowns from "./dropdowns.js";

const expanded = document.querySelector(".expanded-weather");
let forecast, units, current;

export default async function populateExpanded(wForecast, wUnits, wCurrent) {
  const template = document.getElementById("expanded-weather-template");
  const expandedContent = template.content.cloneNode(true);

  const expdDate = expandedContent.querySelector(".date");
  const expdTemp = expandedContent.querySelector(".temperature");
  const expdPrecip = expandedContent.querySelector(".precipitation");
  const expdDesc = expandedContent.querySelector(".description");

  // move vars up scope to avoid passing args or nesting functions
  [forecast, units, current] = [wForecast, wUnits, wCurrent];

  clearDiv(expanded);
  expanded.appendChild(expandedContent);
  expanded.classList.add("populated");

  expdDate.textContent = formatDate(forecast.datetime, current?.datetime);
  await populateTemperature(expdTemp);
  await populatePrecipitation(expdPrecip);
  await populateDescription(expdDesc);

  initDropdowns("popout-btn");
}

async function populateTemperature(element) {
  await createPopoutBtn("temp-popout").then((btn) => element.appendChild(btn));

  if (current) {
    const temp = createDataField(current.temp, units.temp, "Temperature: ");
    const feel = createDataField(current.feelslike, units.temp, "Feels like: ");
    element.appendChild(temp);
    element.appendChild(feel);
  }

  const maxTemp = createDataField(forecast.tempmax, units.temp, "High: ");
  const maxFeel = createDataField(
    forecast.feelslikemax,
    units.temp,
    "Feel high: "
  );
  element.appendChild(maxTemp);
  element.appendChild(maxFeel);

  const minTemp = createDataField(forecast.tempmin, units.temp, "Low: ");
  const minFeel = createDataField(
    forecast.feelslikemin,
    units.temp,
    "Feel low: "
  );
  element.appendChild(minTemp);
  element.appendChild(minFeel);

  // add temperature popout

  const humidity = createDataField(forecast.humidity, "%", "Humidity: ");
  const uvIndex = createDataField(forecast.uvindex, "/10", "UV Index: ");
  const dewpoint = createDataField(forecast.dew, units.temp, "Dewpoint: ");

  const tempPopout = createContainerDiv(
    [humidity, uvIndex, dewpoint],
    ["temp-popout", "popout"]
  );
  element.appendChild(tempPopout);
}

async function populatePrecipitation(element) {
  await createPopoutBtn("precip-popout").then((btn) =>
    element.appendChild(btn)
  );

  let precipitation = "Precipitation";
  if (forecast.preciptype) {
    precipitation = forecast.preciptype.join("/");
    const arr = precipitation.split("");
    arr[0] = arr[0].toUpperCase();
    precipitation = arr.join("");
  }

  const precipChance = createDataField(
    forecast.precipprob,
    "%",
    `${precipitation} chance: `
  );

  element.appendChild(precipChance);

  // add precipitation popout

  const precipFall = createDataField(
    forecast.precip,
    units.lengthSmall,
    "Precipitation: "
  );
  const precipCover = current
    ? createDataField(forecast.precipcover, "%", "Precipitation cover: ")
    : false;
  const snowFall =
    forecast.snow !== 0
      ? createDataField(forecast.snow, units.lengthMed, "New snow: ")
      : false;
  const snowDepth =
    forecast.snowdepth !== 0 && current
      ? createDataField(forecast.snowDepth, units.lengthMed, "Snow depth: ")
      : false;

  const precipPopout = createContainerDiv(
    [precipFall, precipCover, snowFall, snowDepth],
    ["precip-popout", "popout"]
  );
  element.appendChild(precipPopout);
}

async function populateDescription(element) {
  await createPopoutBtn("desc-popout").then((btn) => element.appendChild(btn));

  const description = document.createElement("div");
  description.textContent = forecast.description;

  element.appendChild(description);

  // add misc popout to description

  const cloudCover = createDataField(forecast.cloudcover, "%", "Cloud cover: ");
  const sunrise = createDataField(forecast.sunrise, "", "Sunrise: ");
  const sunset = createDataField(forecast.sunset, "", "Sunset: ");
  const visibility = createDataField(
    forecast.visibility,
    units.distance,
    "Visibility: "
  );
  const windDir = createDataField(forecast.winddir, "°", "Wind direction: ");
  const windSpd = createDataField(
    forecast.windspeed,
    units.speed,
    "Wind speed: "
  );
  const windGst = createDataField(forecast.windgust, units.speed, "Gusts: ");

  const descPopout = createContainerDiv(
    [cloudCover, sunrise, sunset, visibility, windDir, windSpd, windGst],
    ["desc-popout", "popout"]
  );
  element.appendChild(descPopout);
}
