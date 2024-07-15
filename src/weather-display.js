import initDropdowns from "./dropdowns.js";
// I hate everything about this, I see why people use frameworks to generate html now
const location = document.querySelector(".location");
const expanded = document.querySelector(".expanded-weather");
const expdDate = expanded.querySelector(".date");
const expdTemp = expanded.querySelector(".temperature");
const expdPrecip = expanded.querySelector(".precipitation");
const expdDesc = expanded.querySelector(".description");

// seemed like more work to use the intl obj
const unitList = {
  us: { temp: "°F" },
  metric: { temp: "°C" },
  uk: { temp: "°C" },
  base: { temp: "K" },
};
let currentUnits;

export default function updateDisplay(weather) {
  currentUnits = unitList[weather.unit];
  location.textContent = weather.location;
  populateExpanded(weather.forecast[0], weather.current);
  initDropdowns();
}

function populateExpanded(forecast, current) {
  const date = current
    ? new Date(`${forecast.datetime}T${current.datetime}`)
    : new Date(forecast.datetime);
  expdDate.textContent = date.toLocaleString();

  clearDiv(expdTemp);
  // add temperature
  const temp = current
    ? createDataField(current.temp, currentUnits.temp, "Temperature: ")
    : false;

  const minTemp = createDataField(forecast.tempmin, currentUnits.temp, "Low: ");
  const maxTemp = createDataField(
    forecast.tempmax,
    currentUnits.temp,
    "High: "
  );
  expdTemp.appendChild(
    createContainerDiv([temp, minTemp, maxTemp], "temp-forecast")
  );

  // add feelslike
  const feel = current
    ? createDataField(current.feelslike, currentUnits.temp, "Feels like: ")
    : false;
  if (!feel) {
    const minFeel = createDataField(
      forecast.feelslikemin,
      currentUnits.temp,
      "Feels like Low: "
    );
    const maxFeel = createDataField(
      forecast.feelslikemax,
      currentUnits.temp,
      "Feels like High: "
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

  // add precipitation popout

  clearDiv(expdDesc);
  // add description

  // add misc popout to description
}

function clearDiv(div) {
  while (div.firstChild) div.removeChild(div.firstChild);
}

function createDataField(number, unit, prefix) {
  const preSpan = document.createElement("span");
  const numberSpan = document.createElement("span");
  const unitSpan = document.createElement("span");
  preSpan.textContent = prefix;
  numberSpan.textContent = number;
  unitSpan.textContent = unit;
  return createContainerDiv([preSpan, numberSpan, unitSpan]);
}

function createContainerDiv(elements, classNames) {
  const div = document.createElement("div");

  if (Array.isArray(classNames)) {
    classNames.forEach((c) => div.classList.add(c));
  } else if (typeof classNames === "string") {
    div.classList.add(classNames);
  }

  if (Array.isArray(elements)) {
    elements.forEach((e) => {
      if (e) div.appendChild(e);
    });
  } else div.appendChild(elements);

  return div;
}
