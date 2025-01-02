let gameState = {
  totalDiceValue: {},
};

const currentUser = (userDetails, diceValue, userPosition) => {
  console.log("::the current user ", userDetails, window.outputArrForDiceCount);
  let users = [1, 2];
  let currentUserIndex = users[userDetails - 1];

  if (!gameState.totalDiceValue[userDetails]) {
    gameState.totalDiceValue[userDetails] = 0;
  }
  gameState.totalDiceValue[userDetails] += parseInt(diceValue);

  const cellArray = document.getElementsByClassName("cell");
  console.log("::cellArray ", cellArray);

  // for (let element in cellArray) {
  //   console.log("::element is ", cellArray[element]);
  // }

  const resetColors = Array.from(cellArray).filter((el) => {
    return (
      (userDetails === 2 && el.style.backgroundColor === "red") ||
      (userDetails === 1 && el.style.backgroundColor === "green")
    );
  });

  console.log("::resetColors ", resetColors);

  for (let coloredDiv of resetColors) {
    console.log("::coloredDiv ", coloredDiv.getAttribute("class"));
    coloredDiv.style.backgroundColor =
      coloredDiv.getAttribute("class") !== "cell even"
        ? "rgb(243, 233, 221)"
        : "rgb(178, 234, 234)";
    console.log("::coloredDiv ", coloredDiv);
  }
  const filteredCell = Array.from(cellArray).find(
    (el) => el.innerHTML == gameState.totalDiceValue[userDetails]
  );

  filteredCell.style.backgroundColor = userDetails === 1 ? "green" : "red";
  console.log("::filteredcell ", filteredCell);
  const currentPosition = document.getElementById(
    `current-position-value-${userDetails}`
  );
  currentPosition.innerHTML = gameState.totalDiceValue[userDetails];

  if (currentUserIndex === 1) {
    console.log("::came in 1 ", currentUserIndex);
    const turn = document.getElementById(`player-${currentUserIndex}-turn`);
    turn.innerHTML =
      turn.innerHTML === "false" || diceValue === 6 ? "true" : "false";
    const btnClass = document.querySelector(`.submit-btn-${currentUserIndex}`);
    if (diceValue !== 6) {
      document.getElementById(`player-${users[userDetails]}-turn`).innerHTML =
        "true";
      btnClass.disabled = true;
      document.querySelector(
        `.submit-btn-${users[userDetails]}`
      ).disabled = false;
    }
  } else if (currentUserIndex === 2) {
    console.log("::came in 2 ", currentUserIndex);
    const turn = document.getElementById(`player-${currentUserIndex}-turn`);
    const btnClass = document.querySelector(`.submit-btn-${currentUserIndex}`);
    turn.innerHTML =
      turn.innerHTML === "false" || diceValue === 6 ? "true" : "false";
    const currentPosition = document.getElementById(
      `current-position-value-${currentUserIndex}`
    );
    if (diceValue !== 6) {
      document.getElementById(
        `player-${users[userDetails - 2]}-turn`
      ).innerHTML = "true";
      btnClass.disabled = true;
      document.querySelector(
        `.submit-btn-${users[userDetails - 2]}`
      ).disabled = false;
    }
  }
};
export default currentUser;
// window.currentUser = currentUser;
