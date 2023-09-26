console.clear();
const calculator = document.querySelector("#calculator_body");
const buttons = calculator.querySelector("#buttons");

let displayed = "50";
console.log(displayed);
buttons.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    //FIXME
    const key = e.target;
    const action = key.dataset.action;
    //const content = key.textContent;
    displayed = key.textContent;
    console.log(displayed);
  }
});

const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const equals = document.getElementById("equals");
const clearHistory = document.getElementById("clear-history");

// operators.addEventListener("click", (e) => {});
