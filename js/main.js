import { handleFloorChange, handleRebarSizeChange } from "./utils.js";
import { calculateRequirements } from "./calculator.js";
import { calculateCosts } from "./cost.js";
import { bindFormattedInput } from "./numberFormat.js";

function bindEvents() {
  bindFormattedInput("field1", calculateRequirements);
  bindFormattedInput("field2", calculateRequirements);

  document.querySelectorAll('input[name="floorRange"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      handleFloorChange(checkbox);
      calculateRequirements();
    });
  });

  bindFormattedInput("concretePrice", calculateCosts);
  bindFormattedInput("rebarPrice", calculateCosts);
  bindFormattedInput("yonolithPrice", calculateCosts);

  document.querySelectorAll('input[name="rebarSizePrice"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        handleRebarSizeChange(checkbox);
      }
      calculateCosts();
    });
  });
}

document.addEventListener("DOMContentLoaded", bindEvents);
