window.onload = () => {
  function checkWinner() {}

  const players = [1, 2];
  let currentPlayer = players[0];
  const cellArray = document.getElementsByClassName("cell");
  Array.from(cellArray).forEach((element) => {
    element.addEventListener("click", () => {
      if (currentPlayer === 1) {
        element.innerText = "X";
        currentPlayer = players[1];
      } else {
        element.innerText = "O";
        currentPlayer = players[0];
      }
    });
  });
};
