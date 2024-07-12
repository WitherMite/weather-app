import getWeather from "./get-weather.js";

const form = document.forms[0];
const locationInput = document.getElementById("location");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateWeatherDisplay(locationInput.value);
  form.reset();
});

async function updateWeatherDisplay(location, unitIndex) {
  if (location === "") location = "london";
  const weather = await getWeather(location, unitIndex);
  console.log(weather);
}
