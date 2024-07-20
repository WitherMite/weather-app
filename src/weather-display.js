import populateExpanded from "./populate-expanded.js";
import populateForecast from "./populate-forecast.js";
import initDropdowns from "./dropdowns.js";

const location = document.querySelector(".location");

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
  location.classList.add("populated");
  populateExpanded(weather.forecast[0], weather.current, currentUnits);
  populateForecast(weather.forecast, currentUnits);
  initDropdowns();
}
