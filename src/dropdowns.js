export default function initDropdowns(btnClass) {
  const dropdownBtns = document.querySelectorAll(`.${btnClass}`);
  dropdownBtns.forEach((btn) => addButtonBehavior(btn));
}

function addButtonBehavior(btn) {
  const dropdown = document.querySelector(`.${btn.dataset.forClass}`);

  btn.addEventListener("click", () => {
    dropdown.classList.add("open");
    document.addEventListener("click", closeOnOutsideClick);
  });

  function closeOnOutsideClick(e) {
    const isInside = dropdown.contains(e.target) || btn.contains(e.target);
    if (!isInside) {
      dropdown.classList.remove("open");
      document.removeEventListener("click", closeOnOutsideClick);
    }
  }
}
