const root = document.querySelector(":root");
const colors = await fetch("../src/weather-colors.json")
  .then((r) => r.json())
  .catch((e) => console.error(e));

export default function setWeatherStyle(icon) {
  const currentColors = colors[icon];

  root.style.setProperty("--primary-color", currentColors.primaryColor);
  root.style.setProperty("--secondary-color", currentColors.secondaryColor);
  root.style.setProperty("--tertiary-color", currentColors.tertiaryColor);
  root.style.setProperty("--font-color", currentColors.fontColor);
}
