import { getInputNumber } from "./numberFormat.js";

export function formatMoney(amount) {
  return amount.toLocaleString("fa-IR") + " تومان";
}

export function parsePrice(id) {
  const value = getInputNumber(id);
  return !isNaN(value) && value > 0 ? value : 0;
}

export function getActiveFloorMultiplier() {
  const active = document.querySelector('input[name="floorRange"]:checked');
  return active ? parseFloat(active.value) : null;
}

export function getSelectedRebarSize() {
  const active = document.querySelector('input[name="rebarSizePrice"]:checked');
  return active ? parseInt(active.value, 10) : null;
}

export function handleExclusiveCheckbox(selected, name) {
  document.querySelectorAll(`input[name="${name}"]`).forEach((checkbox) => {
    if (checkbox !== selected) {
      checkbox.checked = false;
    }
  });
}

export function handleFloorChange(selected) {
  handleExclusiveCheckbox(selected, "floorRange");
}

export function handleRebarSizeChange(selected) {
  handleExclusiveCheckbox(selected, "rebarSizePrice");
}
