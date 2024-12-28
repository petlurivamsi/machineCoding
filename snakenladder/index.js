import boardGenerator from "./boardGenerator.js";
import rollTheDice from "./rollTheDice.js";

window.onload = () => {
  // Call rollDice when you want to roll
  boardGenerator();
};

window.rollTheDice = rollTheDice;
