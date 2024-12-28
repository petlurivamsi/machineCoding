window.onload = () => {
  let numberCount = 1;
  console.log("::hello");
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
      cellDiv.innerText = j + 1;
    }
  }
  console.log("::boardDiv ", boardDiv);
};
