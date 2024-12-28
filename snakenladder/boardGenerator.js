const boardGenerator = () => {
  let numberPositions = [
    [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];

  const boardDiv = document.querySelector(".board");
  for (let i = 0; i < 10; i++) {
    const rowDiv = document.createElement("div");
    boardDiv.append(rowDiv);
    rowDiv.setAttribute("class", "row");
    for (let j = 0; j < 10; j++) {
      // rowDiv.classList.add("row");
      const cellDiv = document.createElement("div");
      cellDiv.setAttribute("class", "cell");
      rowDiv.appendChild(cellDiv);
      //   cellDiv.innerText = numberCount++;
      cellDiv.innerText = numberPositions[i][j];
      if (numberPositions[i][j] % 2 === 0) {
        cellDiv.style.backgroundColor = "rgb(146, 229, 229)";
      } else {
        cellDiv.style.backgroundColor = "rgb(246, 231, 213)";
      }
    }
  }
};

export default boardGenerator;
