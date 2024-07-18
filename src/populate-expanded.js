import {
  clearDiv,
  createDataField,
  createContainerDiv,
} from "./dom-helpers.js";

const expanded = document.querySelector(".expanded-weather");
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
  const temp = current
    ? createDataField(current.temp, units.temp, "Temperature: ")
    : false;

  const minTemp = createDataField(forecast.tempmin, units.temp, "Low: ");
  const maxTemp = createDataField(forecast.tempmax, units.temp, "High: ");
  expdTemp.appendChild(
    createContainerDiv([temp, minTemp, maxTemp], "temp-forecast")
  );

  // add feelslike
  const feel = current
    ? createDataField(current.feelslike, units.temp, "Feels like: ")
    : false;
  if (!feel) {
    const minFeel = createDataField(
      forecast.feelslikemin,
      units.temp,
      "Feels like low: "
    );
    const maxFeel = createDataField(
      forecast.feelslikemax,
      units.temp,
      "Feels like high: "
    );
    expdTemp.appendChild(
      createContainerDiv([minFeel, maxFeel], "feel-forecast")
    );
  } else {
    expdTemp.appendChild(createContainerDiv(feel, "feel-forecast"));
  }

  // add temperature popout

  clearDiv(expdPrecip);
  // add precipitation chance
  let precipitation;
  if (forecast.preciptype) {
    precipitation = forecast.preciptype.join("/");
    const arr = precipitation.split("");
    arr[0] = arr[0].toUpperCase();
    precipitation = arr.join("");
  }

  const precipChance = createDataField(
    forecast.precipprob,
    "%",
    `${precipitation ?? "Precipitation"} chance: `
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
