console.clear();
const calculator = document.getElementsByClassName("calculator_body");
//const buttons = document.querySelector(".number");

const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const equals = document.getElementById("equals");
const clearHistory = document.getElementById("clear-history");

let displayed = "50";
console.log(displayed);

// numbers.addEventListener("click", (e) => {
//   if (e.target.matches("button")) {
//     //FIXME
//     const key = e.target;
//     const action = key.dataset.action;
//     const content = key.textContent;
//     const displayed = displayed.textContent;
//     console.log(displayed);
//   }
//   console.log(displayed);
// });

// operators.addEventListener("click", (e) => {});
