import populateExpanded from "./populate-expanded.js";
import populateForecast from "./populate-forecast.js";
import initDropdowns from "./dropdowns.js";

const location = document.querySelector(".location");

export default async function updateDisplay(weather) {
  location.textContent = weather.location;
  location.classList.add("populated");
  await populateExpanded(weather.forecast[0], weather.units, weather.current);
  populateForecast(weather.forecast, weather.units);
  initDropdowns("popout-btn");
}
