import boardGenerator from "./boardGenerator.js";
import rollTheDice from "./rollTheDice.js";
import { initialChecks } from "./initialChecks.js";

window.onload = () => {
  // Call rollDice when you want to roll
  initialChecks();
  const outputArrForDiceCount = boardGenerator();
  window.outputArrForDiceCount = outputArrForDiceCount;
  window.rollTheDice = rollTheDice;
  return outputArrForDiceCount;
};
