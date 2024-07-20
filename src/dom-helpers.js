function clearDiv(div) {
  while (div.firstChild) div.removeChild(div.firstChild);
}

function createDataField(number, unit, prefix) {
  let preEle;
  const numberSpan = document.createElement("span");
  const unitSpan = document.createElement("span");
  if (typeof prefix === "string") {
    preEle = document.createElement("span");
    preEle.textContent = prefix;
  } else if (prefix instanceof Element) {
    preEle = prefix;
  }
  numberSpan.textContent = number;
  unitSpan.textContent = unit;
  return createContainerDiv([preEle, numberSpan, unitSpan]);
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
