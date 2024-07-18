function clearDiv(div) {
  while (div.firstChild) div.removeChild(div.firstChild);
}

function createDataField(number, unit, prefix) {
  const preSpan = document.createElement("span");
  const numberSpan = document.createElement("span");
  const unitSpan = document.createElement("span");
  preSpan.textContent = prefix;
  numberSpan.textContent = number;
  unitSpan.textContent = unit;
  return createContainerDiv([preSpan, numberSpan, unitSpan]);
}

function createContainerDiv(elements, classNames) {
  const div = document.createElement("div");

  if (Array.isArray(classNames)) {
    classNames.forEach((c) => div.classList.add(c));
  } else if (typeof classNames === "string") {
    div.classList.add(classNames);
  }

  if (Array.isArray(elements)) {
    elements.forEach((e) => {
      if (e) div.appendChild(e);
    });
  } else div.appendChild(elements);

  return div;
}

export { clearDiv, createDataField, createContainerDiv };
