console.clear();

class calculator {
  constructor(previousText, currenText) {
    this.previousText = previousText;
    this.currenText = currenText;
    this.clear();
  }
  clearFunc() {
    this.currenText = "0";
    this.previousText = "";
    this.operation = undefined;
  }
}
const calculatorBody = document.querySelector("#calculator_body");
const buttons = calculatorBody.querySelector("#buttons");
const answerBox = document.querySelector("#answer");

buttons.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const button = e.target;
    const action = button.dataset.action;
    const content = button.textContent;
    const displayed = answerBox.textContent;
    if (!action) {
      if (displayed === "0") {
        answerBox.textContent = content;
      } else {
        answerBox.textContent = displayed + content;
      }
    }
  }
});

const answer = document.getElementById("answer");
const history = document.getElementById("history");
const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const equals = document.getElementById("equals");
const clearHistory = document.getElementById("clear-history");
const previousText = document.querySelector("#previous");
const currenText = document.querySelector("#current");

// operators.addEventListener("click", (e) => {});
