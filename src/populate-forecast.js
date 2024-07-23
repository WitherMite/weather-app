import { clearDiv, createDataField, getUrl } from "./dom-helpers.js";

const calendar = document.querySelector(".forecast-calendar");
const dayTemplate = document.getElementById("forecast-day-template");
const highSvg = await getUrl("../src/assets/temperature-arrow-up.svg");
const lowSvg = await getUrl("../src/assets/temperature-arrow-down.svg");
const rainSvg = await getUrl("../src/assets/rain.svg");

export default function populateForecast(forecast, units) {
  calendar.classList.add("populated");
  clearDiv(calendar);
  const days = [];
  // create a list of day containers, so that all forecasted days can be put inside their corresponding grid space on the calendar with empty padding spaces
  const minCalendarSpaces = forecast.length - (forecast.length % 7) + 7;
  for (let i = 0; i < minCalendarSpaces; i++) {
    const div = document.createElement("div");
    div.classList.add("day-container");
    days.push(div);
    calendar.appendChild(div);
  }

  const startDate = new Date(forecast[0].datetime);
  const startDay = startDate.getUTCDay();
  // remove padding spaces from array (still in DOM)
  days.splice(0, startDay);
  days.splice(forecast.length, days.length - forecast.length);

  days.forEach(populateDay);

  function populateDay(dayContainer, index) {
    const dayElement = dayTemplate.content.cloneNode(true);
    const dateDiv = dayElement.querySelector(".date");
    const forecastDay = forecast[index];

    const date = new Date(forecastDay.datetime);
    const dayOfMonth = date.getUTCDate();
    dateDiv.textContent = dayOfMonth;

    const highImg = document.createElement("img");
    const lowImg = document.createElement("img");
    const rainImg = document.createElement("img");
    highImg.src = highSvg;
    lowImg.src = lowSvg;
    rainImg.src = rainSvg;

    const tempDiv = dayElement.querySelector(".temperature");
    const maxTemp = createDataField(forecastDay.tempmax, units.temp, highImg);
    const minTemp = createDataField(forecastDay.tempmin, units.temp, lowImg);
    tempDiv.appendChild(maxTemp);
    tempDiv.appendChild(minTemp);

    const precipDiv = dayElement.querySelector(".precipitation");
    const precipChance = createDataField(forecastDay.precipprob, "%", rainImg);
    precipDiv.appendChild(precipChance);

    const descDiv = dayElement.querySelector(".description");
    const conditions = document.createElement("div");
    conditions.textContent = forecastDay.conditions;
    descDiv.appendChild(conditions);

    dayContainer.appendChild(dayElement);
  }
}
