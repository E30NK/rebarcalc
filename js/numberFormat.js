const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toLatinDigits(str) {
  let s = String(str);
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(PERSIAN_DIGITS[i], "g"), String(i));
    s = s.replace(new RegExp(ARABIC_DIGITS[i], "g"), String(i));
  }
  return s;
}

export function parseFormattedNumber(value) {
  if (value === null || value === undefined) return NaN;
  const cleaned = toLatinDigits(String(value).trim()).replace(/[,،٬\s]/g, "");
  if (cleaned === "") return NaN;
  const num = parseFloat(cleaned);
  return isNaN(num) ? NaN : num;
}

export function getInputNumber(id) {
  const el = document.getElementById(id);
  if (!el) return NaN;
  return parseFormattedNumber(el.value);
}

export function hasInputValue(id) {
  return document.getElementById(id).value.trim() !== "";
}

export function formatNumberDisplay(num, decimals = null) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  const options =
    decimals !== null
      ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
      : {};
  return Number(num).toLocaleString("fa-IR", options);
}

export function bindFormattedInput(id, onUpdate) {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("input", () => {
    const digits = toLatinDigits(el.value).replace(/[^\d]/g, "");

    if (!digits) {
      el.value = "";
      onUpdate();
      return;
    }

    el.value = parseInt(digits, 10).toLocaleString("fa-IR");
    onUpdate();
  });
}
