import getWeather from "./src/get-weather.js";
import updateDisplay from "./src/dom-modules/weather-display.js";
import setWeatherStyle from "./src/dom-modules/weather-style.js";

setDefaultStyle();

const form = document.forms[0];
const locationInput = document.getElementById("location");
const unitInput = document.getElementById("unit");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateWeatherDisplay(locationInput.value, Number(unitInput.value));
});

function setDefaultStyle() {
  const now = new Date();
  const currentHour = now.getHours();
  if (currentHour < 6 || currentHour > 20) {
    setWeatherStyle("clear-night");
  }
}

async function updateWeatherDisplay(location, unitIndex) {
  if (location === "") location = "london";
  const weather = await getWeather(location, unitIndex);
  if (weather) updateDisplay(weather);
}
