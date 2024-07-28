import { getUrl } from "./dom-helpers.js";

const root = document.querySelector(":root");
const popoutSvg = await getUrl("./src/assets/popout-dark.svg");
const highSvg = await getUrl("./src/assets/temperature-arrow-up-dark.svg");
const lowSvg = await getUrl("./src/assets/temperature-arrow-down-dark.svg");
const rainSvg = await getUrl("./src/assets/rain-dark.svg");
const highSvgLight = await getUrl("./src/assets/temperature-arrow-up.svg");
const lowSvgLight = await getUrl("./src/assets/temperature-arrow-down.svg");
const rainSvgLight = await getUrl("./src/assets/rain.svg");
const colors = await fetch("./src/weather-colors.json")
  .then((r) => r.json())
  .catch((e) => console.error(e));

export default function setWeatherStyle(icon) {
  const currentColors = colors[icon];

  root.style.setProperty("--primary-color", currentColors.primaryColor);
  root.style.setProperty("--secondary-color", currentColors.secondaryColor);
  root.style.setProperty("--tertiary-color", currentColors.tertiaryColor);
  root.style.setProperty("--font-color", currentColors.fontColor);

  const highImgs = document.querySelectorAll("img.high");
  const lowImgs = document.querySelectorAll("img.low");
  const rainImgs = document.querySelectorAll("img.rain");
  if (currentColors.isDark) {
    const popoutImgs = document.querySelectorAll("img.popout-img");

    highImgs.forEach((i) => (i.src = highSvg));
    lowImgs.forEach((i) => (i.src = lowSvg));
    rainImgs.forEach((i) => (i.src = rainSvg));
    popoutImgs.forEach((i) => (i.src = popoutSvg));
  } else {
    // because the calendar doesnt reset when the expanded view does, imgs dont update themselves
    highImgs.forEach((i) => (i.src = highSvgLight));
    lowImgs.forEach((i) => (i.src = lowSvgLight));
    rainImgs.forEach((i) => (i.src = rainSvgLight));
  }
}
