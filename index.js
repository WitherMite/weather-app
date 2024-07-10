import getWeather from "./get-weather.js";

const city = "london";
const weather = await getWeather(city);
console.log(weather);
