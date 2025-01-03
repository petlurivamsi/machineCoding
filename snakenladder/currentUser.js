let gameState = {
  totalDiceValue: {},
};

const currentUser = (userDetails, diceValue, userPosition) => {
  let users = [1, 2];
  let currentUserIndex = users[userDetails - 1];
  let successMessage = document.querySelector(".success-message");

  if (!gameState.totalDiceValue[userDetails]) {
    gameState.totalDiceValue[userDetails] = 0;
  }
  gameState.totalDiceValue[userDetails] += diceValue;

  let snakeMap = new Map();
  snakeMap.set(36, 6), snakeMap.set(32, 10), snakeMap.set(97, 78);
  snakeMap.set(95, 56), snakeMap.set(88, 22), snakeMap.set(62, 18);
  snakeMap.set(48, 26);

  let ladderMap = new Map();
  ladderMap.set(1, 38), ladderMap.set(4, 14), ladderMap.set(8, 30);
  ladderMap.set(28, 76), ladderMap.set(21, 42), ladderMap.set(50, 67);
  ladderMap.set(71, 92), ladderMap.set(80, 99);
  if (
    Array.from(ladderMap.keys()).includes(gameState.totalDiceValue[userDetails])
  ) {
    gameState.totalDiceValue[userDetails] = ladderMap.get(
      gameState.totalDiceValue[userDetails]
    );
  }

  if (
    Array.from(snakeMap.keys()).includes(gameState.totalDiceValue[userDetails])
  ) {
    gameState.totalDiceValue[userDetails] = snakeMap.get(
      gameState.totalDiceValue[userDetails]
    );
  }

  if (gameState.totalDiceValue[userDetails] > 100) {
    gameState.totalDiceValue[userDetails] -= diceValue;
  }

  if (gameState.totalDiceValue[userDetails] === 100) {
    successMessage.innerText = `user ${userDetails} won`;
    users.map((user) => {
      gameState.totalDiceValue[user] = 0;
      let diceBtn = document.querySelector(`.submit-btn-${user}`);
      diceBtn.disabled = true;
      const turn = document.getElementById(`player-${user}-turn`);
      turn.innerText = false;

      const currentPositionValue = document.getElementById(
        `current-position-value-${user}`
      );
      currentPositionValue.innerText = "";
      const currentDiceValue = document.getElementById(
        `current-dice-value-${user}`
      );
      currentDiceValue.innerText = "";

      document.querySelector(".green").classList.remove("green");
      document.querySelector(".red").classList.remove("red");
    });
  }

  const cellArray = document.getElementsByClassName("cell");
  Array.from(cellArray).forEach((el) => {
    userDetails === 1 && el.classList.remove("green");
    userDetails === 2 && el.classList.remove("red");
  });

  const filteredCell = Array.from(cellArray).find(
    (el) => el.innerHTML == gameState.totalDiceValue[userDetails]
  );

  filteredCell.classList.add(userDetails === 1 ? "green" : "red");

  const currentPosition = document.getElementById(
    `current-position-value-${userDetails}`
  );
  currentPosition.innerHTML = gameState.totalDiceValue[userDetails];

  if (currentUserIndex === 1) {
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
    const turn = document.getElementById(`player-${currentUserIndex}-turn`);
    const btnClass = document.querySelector(`.submit-btn-${currentUserIndex}`);
    turn.innerHTML =
      turn.innerHTML === "false" || diceValue === 6 ? "true" : "false";

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

