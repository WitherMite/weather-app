import {
  clearDiv,
  createDataField,
  createContainerDiv,
  createPopoutBtn,
} from "./dom-helpers.js";

const expanded = document.querySelector(".expanded-weather");

const template = document.getElementById("expanded-weather-template");
const expandedContent = template.content.cloneNode(true);

const expdDate = expandedContent.querySelector(".date");
const expdTemp = expandedContent.querySelector(".temperature");
const expdPrecip = expandedContent.querySelector(".precipitation");
const expdDesc = expandedContent.querySelector(".description");

// TODO: find out why when called by calendar the popups arent added
export default async function populateExpanded(forecast, units, current) {
  expanded.appendChild(expandedContent);
  expanded.classList.add("populated");

  // TODO: fix date string, it being given in queried location's timezone is a headache...
  const date = current
    ? new Date(`${forecast.datetime}T${current.datetime}`)
    : new Date(forecast.datetime);
  expdDate.textContent = date.toLocaleString();

  clearDiv(expdTemp);
  // add temperature

  await createPopoutBtn("temp-popout").then((btn) => expdTemp.appendChild(btn));

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

  const tempPopout = createContainerDiv(
    [humidity, uvIndex, dewpoint],
    ["temp-popout", "popout"]
  );
  expdTemp.appendChild(tempPopout);

  clearDiv(expdPrecip);
  // add precipitation chance

  await createPopoutBtn("precip-popout").then((btn) =>
    expdPrecip.appendChild(btn)
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

  const precipPopout = createContainerDiv(
    [precipFall, precipCover, snowFall, snowDepth],
    ["precip-popout", "popout"]
  );
  expdPrecip.appendChild(precipPopout);

  clearDiv(expdDesc);
  // add description

  await createPopoutBtn("desc-popout").then((btn) => expdDesc.appendChild(btn));

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

  const descPopout = createContainerDiv(
    [cloudCover, sunrise, sunset, visibility, windDir, windSpd, windGst],
    ["desc-popout", "popout"]
  );
  expdDesc.appendChild(descPopout);
}
