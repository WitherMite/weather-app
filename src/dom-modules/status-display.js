const display = document.querySelector(".status-display");

function displayStatus(msg, dismissable) {
  display.textContent = msg;
  display.classList.add("open");
  if (dismissable) document.addEventListener("click", hideOnClick);
}

function hideStatus() {
  display.textContent = "";
  display.classList.remove("open");
}

function hideOnClick() {
  hideStatus();
  document.removeEventListener("click", hideOnClick);
}

export { displayStatus, hideStatus };
