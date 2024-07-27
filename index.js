import getWeather from "./src/get-weather.js";
import updateDisplay from "./src/dom-modules/weather-display.js";

const form = document.forms[0];
const locationInput = document.getElementById("location");
const unitInput = document.getElementById("unit");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateWeatherDisplay(locationInput.value, Number(unitInput.value));
});

async function updateWeatherDisplay(location, unitIndex) {
  if (location === "") location = "london";
  const weather = await getWeather(location, unitIndex);
  if (weather) updateDisplay(weather);
}
