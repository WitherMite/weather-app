import { clearDiv, createDataField } from "./dom-helpers.js";

const expanded = document.querySelector(".expanded-weather");
// TODO: generate children to prevent their padding from existing when empty
const expdDate = expanded.querySelector(".date");
const expdTemp = expanded.querySelector(".temperature");
const expdPrecip = expanded.querySelector(".precipitation");
const expdDesc = expanded.querySelector(".description");

export default function populateExpanded(forecast, current, units) {
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
    "Feels like high: "
  );
  expdTemp.appendChild(maxTemp);
  expdTemp.appendChild(maxFeel);

  const minTemp = createDataField(forecast.tempmin, units.temp, "Low: ");
  const minFeel = createDataField(
    forecast.feelslikemin,
    units.temp,
    "Feels like low: "
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
