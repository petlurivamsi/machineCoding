import currentUser from "./currentUser.js";
export default function rollTheDice(diceId, userDetails, userPosition) {
  const dice = document.getElementById(diceId);
  let user = 0;
  // Generate a random dice value from 1 to 6
  const diceValue = Math.floor(Math.random() * 6) + 1;

  //changed something

  // Define rotations for each side to show
  const rotations = {
    1: "rotateX(0deg) rotateY(0deg)", // Front
    2: "rotateX(90deg) rotateY(0deg)", // Bottom
    3: "rotateX(0deg) rotateY(-90deg)", // Left
    4: "rotateX(0deg) rotateY(90deg)", // Right
    5: "rotateX(-90deg) rotateY(0deg)", // Top
    6: "rotateX(0deg) rotateY(180deg)", // Back
  };

  // Apply random rotation to the dice
  dice.style.transform = rotations[diceValue];

  const currentValue = document.getElementById(
    `current-dice-value-${userDetails}`
  );
  const productElement = document.getElementsByClassName("side");
  currentValue.innerHTML = diceValue;
  currentUser(userDetails, diceValue, userPosition);
}
