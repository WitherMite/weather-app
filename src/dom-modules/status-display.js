const display = document.querySelector(".status-display");

function displayStatus(msg) {
  display.textContent = msg;
  display.classList.add("open");
}

function hideStatus() {
  display.textContent = "";
  display.classList.remove("open");
}

export { displayStatus, hideStatus };
