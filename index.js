import getForecast from "./get-forecast.js";

const city = "london";
const weather = await getForecast(city);
console.log(weather);
