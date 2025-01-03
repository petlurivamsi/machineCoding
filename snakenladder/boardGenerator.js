import generateBoard from "./generateSnakePattern.js";
const boardGenerator = () => {
  let numberPositions = generateBoard();
  const boardDiv = document.querySelector(".board");
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.setAttribute("class", "cell");
      cellDiv.innerText = numberPositions.reversedArray[i][j];
      cellDiv.classList.add(
        numberPositions.reversedArray[i][j] % 2 === 0 ? "even" : "odd"
      );
      fragment.appendChild(cellDiv);
    }
  }
  boardDiv.appendChild(fragment);

  return numberPositions.outputArrForDiceCount;
};

export default boardGenerator;
