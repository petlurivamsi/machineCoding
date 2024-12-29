export default function currentUser(userDetails, diceValue, userPosition) {
  console.log("::the current user ", userDetails);
  let users = [1, 2];

  //   const turn = document.getElementById(`player-${userDetails}-turn`);
  if (users[userDetails - 1] === 1) {
    console.log("::came in 1 ", users[userDetails - 1]);
    const turn = document.getElementById(
      `player-${users[userDetails - 1]}-turn`
    );
    turn.innerHTML =
      turn.innerHTML === "false" || diceValue === 6 ? "true" : "false";
    const btnClass = document.querySelector(
      `.submit-btn-${users[userDetails - 1]}`
    );
    const currentPosition = document.getElementById(
      `current-position-value-${users[userDetails - 1]}`
    );
    if (diceValue !== 6) {
      document.getElementById(`player-${users[userDetails]}-turn`).innerHTML =
        "true";
      btnClass.disabled = true;
      document.querySelector(
        `.submit-btn-${users[userDetails]}`
      ).disabled = false;
    }
  } else if (users[userDetails - 1] === 2) {
    console.log("::came in 2 ", users[userDetails - 1]);
    const turn = document.getElementById(
      `player-${users[userDetails - 1]}-turn`
    );
    const btnClass = document.querySelector(
      `.submit-btn-${users[userDetails - 1]}`
    );
    turn.innerHTML =
      turn.innerHTML === "false" || diceValue === 6 ? "true" : "false";
    const currentPosition = document.getElementById(
      `current-position-value-${users[userDetails - 1]}`
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
}

// window.currentUser = currentUser;
