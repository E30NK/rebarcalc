import { REBAR_SIZES, calcData } from "./config.js";
import { getActiveFloorMultiplier } from "./utils.js";
import { calculateCosts } from "./cost.js";
import {
  getInputNumber,
  hasInputValue,
  formatNumberDisplay,
} from "./numberFormat.js";

export function updateRebarBreakdown(totalKg) {
  const breakdownEl = document.getElementById("rebarBreakdown");

  if (!totalKg || totalKg <= 0) {
    breakdownEl.innerHTML = "";
    breakdownEl.hidden = true;
    calcData.rebarCounts = {};
    calcData.rebarKg = 0;
    calculateCosts();
    return;
  }

  calcData.rebarKg = totalKg;
  calcData.rebarCounts = {};

  breakdownEl.hidden = false;
  breakdownEl.innerHTML = REBAR_SIZES.map(({ size, weightPerBar }) => {
    const count = Math.ceil(totalKg / weightPerBar);
    calcData.rebarCounts[size] = count;
    return `
      <div class="rebar-size-item">
        <span class="rebar-size-label">میلگرد ${size}</span>
        <span class="rebar-size-value">${count.toLocaleString("fa-IR")} شاخه ۱۲ متری</span>
      </div>
    `;
  }).join("");

  calculateCosts();
}

export function calculateRequirements() {
  const hasField1 = hasInputValue("field1");
  const hasField2 = hasInputValue("field2");
  const field1 = getInputNumber("field1");
  const field2 = getInputNumber("field2");

  const concreteEl = document.getElementById("concrete");
  const rebarEl = document.getElementById("rebar");
  const yonolithEl = document.getElementById("yonolith");
  const yonolithUnit = document.getElementById("yonolithUnit");

  if (hasField1 && !isNaN(field1)) {
    calcData.concrete = field1 * 0.4;
    concreteEl.textContent = formatNumberDisplay(calcData.concrete, 2);

    const multiplier = getActiveFloorMultiplier();
    if (multiplier !== null) {
      const rebarKg = Math.round(field1 * multiplier);
      rebarEl.textContent = formatNumberDisplay(rebarKg);
      updateRebarBreakdown(rebarKg);
    } else {
      rebarEl.textContent = "—";
      updateRebarBreakdown(0);
    }
  } else {
    calcData.concrete = 0;
    concreteEl.textContent = "0";
    rebarEl.textContent = "0";
    updateRebarBreakdown(0);
  }

  if (hasField2 && !isNaN(field2)) {
    calcData.yonolith = Math.round(field2 * 0.65);
    yonolithEl.textContent = formatNumberDisplay(calcData.yonolith);
    yonolithUnit.textContent = " عدد";
  } else {
    calcData.yonolith = 0;
    yonolithEl.textContent = "—";
    yonolithUnit.textContent = "";
  }

  calcData.totalArea =
    (hasField1 && !isNaN(field1) ? field1 : 0) +
    (hasField2 && !isNaN(field2) ? field2 : 0);

  calculateCosts();
}
