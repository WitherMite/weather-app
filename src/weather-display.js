import populateExpanded from "./populate-expanded.js";
import populateForecast from "./populate-forecast.js";
import initDropdowns from "./dropdowns.js";

const location = document.querySelector(".location");

// seemed like more work to use the intl obj
const unitList = {
  us: {
    temp: "°F",
    lengthSmall: " in.",
    lengthMed: " in.",
    distance: "mi",
    speed: "mph",
  },
  metric: {
    temp: "°C",
    lengthSmall: "mm",
    lengthMed: "cm",
    distance: "km",
    speed: "kph",
  },
  uk: {
    temp: "°C",
    lengthSmall: "mm",
    lengthMed: "cm",
    distance: "mi",
    speed: "mph",
  },
  base: {
    temp: "K",
    lengthSmall: "mm",
    lengthMed: "cm",
    distance: "km",
    speed: "kph",
  },
};
let currentUnits;

export default async function updateDisplay(weather) {
  currentUnits = unitList[weather.unit];
  location.textContent = weather.location;
  location.classList.add("populated");
  await populateExpanded(weather.forecast[0], currentUnits, weather.current);
  populateForecast(weather.forecast, currentUnits);
  initDropdowns("popout-btn");
}
