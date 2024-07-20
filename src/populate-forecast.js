import { clearDiv } from "./dom-helpers.js";

const calendar = document.querySelector(".forecast-calendar");
const dayTemplate = document.getElementById("forecast-day-template");

export default function populateForecast(forecast) {
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

    // TODO: write weather data to days

    dayContainer.appendChild(dayElement);
  }
}
