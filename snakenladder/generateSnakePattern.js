const generateBoardNumbers = () => {
  let count = 1;
  let boardArray = [];
  for (let i = 1; i <= 10; i++) {
    let tempArray = [];
    for (let j = 1; j <= 10; j++) {
      tempArray.push(count++);
    }
    boardArray.push(tempArray);
  }
  return boardArray;
};

const reverseArray = (arr) => {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }

  return arr;
};

function generateSnakeBoardPattern(reversedArray) {
  let shouldSort = false;
  const outputArrForDiceCount = [];
  for (let i = reversedArray.length - 1; i >= 0; i--) {
    outputArrForDiceCount.push(...reversedArray[i]);
    shouldSort ? reverseArray(reversedArray[i]) : reversedArray[i];

    shouldSort = !shouldSort;
  }

  return { reversedArray, outputArrForDiceCount };
}

function generateBoard() {
  let generateNumbersForBoard = generateBoardNumbers();
  const reverseTheGeneratedNumbers = reverseArray(generateNumbersForBoard);
  const generateSnakePatternAndOutputArr = generateSnakeBoardPattern(
    reverseTheGeneratedNumbers
  );

  return generateSnakePatternAndOutputArr;
}

export default generateBoard;
