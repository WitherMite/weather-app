import { clearDiv, createDataField } from "./dom-helpers.js";

const expanded = document.querySelector(".expanded-weather");

const template = document.getElementById("expanded-weather-template");
const expandedContent = template.content.cloneNode(true);

const expdDate = expandedContent.querySelector(".date");
const expdTemp = expandedContent.querySelector(".temperature");
const expdPrecip = expandedContent.querySelector(".precipitation");
const expdDesc = expandedContent.querySelector(".description");

export default function populateExpanded(forecast, current, units) {
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

  clearDiv(expdDesc);
  // add description
  const description = document.createElement("div");
  description.textContent = forecast.description;

  expdDesc.appendChild(description);

  // add misc popout to description
}
