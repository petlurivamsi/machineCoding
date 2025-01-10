console.log("::My first code.");

const add = (num1, num2) => num1 + num2;

const sumArr = [];
//for loop having i
for (let i = 0; i < 10; i++) {
  //nested for loop
  for (let j = 0; j < 10; j++) {
    sumArr.push(add(i, j));
  }
}
