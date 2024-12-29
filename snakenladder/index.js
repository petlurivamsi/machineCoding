import boardGenerator from "./boardGenerator.js";
import rollTheDice from "./rollTheDice.js";
import { initialChecks } from "./initialChecks.js";

window.onload = () => {
  console.log("::initial js");

  // Call rollDice when you want to roll
  initialChecks();
  boardGenerator();
};

window.rollTheDice = rollTheDice;
