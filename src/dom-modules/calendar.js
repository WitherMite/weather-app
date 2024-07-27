import populateExpanded from "./populate-expanded.js";

const calendar = document.querySelector(".forecast-calendar");

export default function initCalendar(weather) {
  calendar.addEventListener("click", expandDay);

  function expandDay(e) {
    let target = e.target;
    let targetData = target.dataset.dayIndex;
    while (true) {
      if (target === calendar) break;
      if (targetData || targetData === "0") {
        const index = Number(targetData);
        const current = targetData === "0" ? weather.current : null;
        populateExpanded(weather.forecast[index], weather.units, current);
        break;
      }
      target = target.parentElement;
      targetData = target.dataset.dayIndex;
    }
  }
}
