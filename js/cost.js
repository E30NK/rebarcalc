import { calcData } from "./config.js";
import { formatMoney, parsePrice, getSelectedRebarSize } from "./utils.js";

export function calculateCosts() {
  const concretePrice = parsePrice("concretePrice");
  const rebarPrice = parsePrice("rebarPrice");
  const yonolithPrice = parsePrice("yonolithPrice");
  const selectedSize = getSelectedRebarSize();

  const costConcreteEl = document.getElementById("costConcrete");
  const costRebarEl = document.getElementById("costRebar");
  const costRebarDetailsEl = document.getElementById("costRebarDetails");
  const costYonolithEl = document.getElementById("costYonolith");
  const costTotalEl = document.getElementById("costTotal");
  const costPerMeterEl = document.getElementById("costPerMeter");

  let total = 0;

  if (calcData.concrete > 0 && concretePrice > 0) {
    const cost = calcData.concrete * concretePrice;
    total += cost;
    costConcreteEl.textContent = formatMoney(cost);
  } else {
    costConcreteEl.textContent = "—";
  }

  let rebarTotal = 0;
  let rebarDetailsHtml = "";

  if (rebarPrice > 0 && selectedSize !== null) {
    const count = calcData.rebarCounts[selectedSize] || 0;
    if (count > 0) {
      rebarTotal = count * rebarPrice;
      rebarDetailsHtml = `
        <div class="cost-detail-item">
          <span>میلگرد ${selectedSize} — ${count.toLocaleString("fa-IR")} شاخه</span>
          <span>${formatMoney(rebarTotal)}</span>
        </div>
      `;
    }
  }

  if (rebarTotal > 0) {
    total += rebarTotal;
    costRebarEl.textContent = formatMoney(rebarTotal);
    costRebarDetailsEl.innerHTML = rebarDetailsHtml;
    costRebarDetailsEl.hidden = false;
  } else {
    costRebarEl.textContent = "—";
    costRebarDetailsEl.innerHTML = "";
    costRebarDetailsEl.hidden = true;
  }

  if (calcData.yonolith > 0 && yonolithPrice > 0) {
    const cost = calcData.yonolith * yonolithPrice;
    total += cost;
    costYonolithEl.textContent = formatMoney(cost);
  } else {
    costYonolithEl.textContent = "—";
  }

  if (total > 0) {
    costTotalEl.textContent = formatMoney(total);

    if (calcData.totalArea > 0) {
      const perMeter = total / calcData.totalArea;
      costPerMeterEl.textContent = formatMoney(Math.round(perMeter));
    } else {
      costPerMeterEl.textContent = "—";
    }
  } else {
    costTotalEl.textContent = "—";
    costPerMeterEl.textContent = "—";
  }
}
