import {
  clearDiv,
  createDataField,
  createContainerDiv,
} from "./dom-helpers.js";

const expanded = document.querySelector(".expanded-weather");

const template = document.getElementById("expanded-weather-template");
const expandedContent = template.content.cloneNode(true);

const expdDate = expandedContent.querySelector(".date");
const expdTemp = expandedContent.querySelector(".temperature");
const expdPrecip = expandedContent.querySelector(".precipitation");
const expdDesc = expandedContent.querySelector(".description");

export default function populateExpanded(forecast, units, current) {
  expanded.appendChild(expandedContent);
  expanded.classList.add("populated");
  const date = current
    ? new Date(`${forecast.datetime}T${current.datetime}`)
    : new Date(forecast.datetime);
  expdDate.textContent = date.toLocaleString();

  clearDiv(expdTemp);
  // add temperature
  if (current) {
    const temp = createDataField(current.temp, units.temp, "Temperature: ");
    const feel = createDataField(current.feelslike, units.temp, "Feels like: ");
    expdTemp.appendChild(temp);
    expdTemp.appendChild(feel);
  }

  const maxTemp = createDataField(forecast.tempmax, units.temp, "High: ");
  const maxFeel = createDataField(
    forecast.feelslikemax,
    units.temp,
    "Feel high: "
  );
  expdTemp.appendChild(maxTemp);
  expdTemp.appendChild(maxFeel);

  const minTemp = createDataField(forecast.tempmin, units.temp, "Low: ");
  const minFeel = createDataField(
    forecast.feelslikemin,
    units.temp,
    "Feel low: "
  );
  expdTemp.appendChild(minTemp);
  expdTemp.appendChild(minFeel);

  // add temperature popout
  const humidity = createDataField(forecast.humidity, "%", "Humidity: ");
  const uvIndex = createDataField(forecast.uvindex, "/10", "UV Index: ");
  const dewpoint = createDataField(forecast.dew, units.temp, "Dewpoint: ");
  const tempBounding = document.createElement("div");

  const tempPopout = createContainerDiv(
    [humidity, uvIndex, dewpoint, tempBounding],
    ["temp-popout", "popout"]
  );
  tempPopout.dataset.boundingClass = "temp-popout-bounds";
  tempBounding.classList.add("temp-popout-bounds");
  expdTemp.appendChild(tempPopout);

  clearDiv(expdPrecip);
  // add precipitation chance
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

  expdPrecip.appendChild(precipChance);

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
  const precipBounding = document.createElement("div");

  const precipPopout = createContainerDiv(
    [precipFall, precipCover, snowFall, snowDepth, precipBounding],
    ["precip-popout", "popout"]
  );
  precipPopout.dataset.boundingClass = "precip-popout-bounds";
  precipBounding.classList.add("precip-popout-bounds");
  expdPrecip.appendChild(precipPopout);

  clearDiv(expdDesc);
  // add description
  const description = document.createElement("div");
  description.textContent = forecast.description;

  expdDesc.appendChild(description);

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
  const descBounding = document.createElement("div");

  const descPopout = createContainerDiv(
    [
      cloudCover,
      sunrise,
      sunset,
      visibility,
      windDir,
      windSpd,
      windGst,
      descBounding,
    ],
    ["desc-popout", "popout"]
  );
  descPopout.dataset.boundingClass = "desc-popout-bounds";
  descBounding.classList.add("desc-popout-bounds");
  expdDesc.appendChild(descPopout);
}
