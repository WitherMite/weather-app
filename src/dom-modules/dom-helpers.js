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

async function getUrl(path) {
  return await fetch(path)
    .then((r) => r.url)
    .catch((e) => console.error(e));
}

// pre-fetch img so it isnt called every time a new button is made
const popoutSvg = await getUrl("../src/assets/popout.svg");

async function createPopoutBtn(forPopout) {
  const btn = document.createElement("button");
  btn.classList.add("popout-btn");
  btn.dataset.forClass = forPopout;

  const img = document.createElement("img");
  img.classList.add("popout-img");
  img.title = "Click for more";
  img.src = popoutSvg;
  btn.appendChild(img);
  return btn;
}

export {
  clearDiv,
  createDataField,
  createContainerDiv,
  createPopoutBtn,
  getUrl,
};
