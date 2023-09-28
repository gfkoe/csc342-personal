console.clear();

class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }
  clear() {
    this.currentText = "0";
    this.previousText = "";
    this.operation = undefined;
  }
  deleteFunc() {}
  addNumberFunc(number) {}
  chooseOperation(operation) {}
  calculate() {}
  displayAnswer() {}
}
const calculatorBody = document.querySelector("#calculator_body");
const buttons = calculatorBody.querySelectorAll("#buttons");
const answerBox = document.querySelector("#answer");

const answer = document.getElementById("answer");
const history = document.getElementById("history");
const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const equals = document.getElementById("equals");
const clearHistory = document.getElementById("clear-history");
const previousText = document.querySelector("#previous");
const currentText = document.querySelector("#current");

const calculator = new Calculator(previousText, currentText);

clear.addEventListener("click", (e) => {
  calculator.clear();
});

Array.from(numbers).forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.addNumberFunc(button.innerHTML);
    console.log(button.innerHTML);
    // if (e.target.matches("button")) {
    //   const button = e.target;
    //   const action = button.dataset.action;
    //   const content = button.textContent;
    //   const displayed = answerBox.textContent;
    //   if (!action) {
    //     if (displayed === "0") {
    //       answerBox.textContent = content;
    //     } else {
    //       answerBox.textContent = displayed + content;
    //     }
    //   }
    // }
  });

  button.addEventListener("keydown", (e) => {
    if (e.isComposing || e.keyCode === 49) {
      console.log(1);
    }
    if (e.isComposing || e.keyCode === 50) {
      console.log(2);
    }
    if (e.isComposing || e.keyCode === 51) {
      console.log(3);
    }
    if (e.isComposing || e.keyCode === 52) {
      console.log(4);
    }
    if (e.isComposing || e.keyCode === 53) {
      console.log(5);
    }
    if (e.isComposing || e.keyCode === 54) {
      console.log(6);
    }
    if (e.isComposing || e.keyCode === 55) {
      console.log(7);
    }
    if (e.isComposing || e.keyCode === 56) {
      console.log(8);
    }
    if (e.isComposing || e.keyCode === 57) {
      console.log(9);
    }
    if (e.isComposing || e.keyCode === 48) {
      console.log(0);
    }
  });
});
