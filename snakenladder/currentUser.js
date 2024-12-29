let gameState = {
  totalDiceValue: {},
};

const currentUser = (userDetails, diceValue, userPosition) => {
  console.log("::the current user ", userDetails);
  let users = [1, 2];
  let currentUserIndex = users[userDetails - 1];

  if (!gameState.totalDiceValue[userDetails]) {
    gameState.totalDiceValue[userDetails] = 0;
  }
  gameState.totalDiceValue[userDetails] += parseInt(diceValue);

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
