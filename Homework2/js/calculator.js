console.clear();
let historyVal = "";
let history = document.getElementById("history");
class Calculator {
  constructor(previousText, currentText) {
    this.previousText = previousText;
    this.currentText = currentText;
    this.clear();
  }
  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }

  addNumber(number) {
    if (number === "." && this.current.includes(".")) {
      return;
    }
    this.current = this.current + number;
  }
  chooseOperation(operation) {
    if (this.current === "") {
      return;
    }
    if (this.previous !== "") {
      this.calculate();
    }
    this.operation = operation;

    this.previous = this.current;
    // this.updateHistory(this.current + "<br>");
    this.current = "";
  }
  calculate() {
    let newAnswer = 0;
    const prevNumber = parseFloat(this.previous);
    const currentNumber = parseFloat(this.current);
    if (isNaN(prevNumber) || isNaN(currentNumber)) {
      return;
    }
    switch (this.operation) {
      case "+":
        newAnswer = prevNumber + currentNumber;

        break;
      case "-":
        newAnswer = prevNumber - currentNumber;
        // this.updateHistory(newAnswer + "<br>");
        break;
      case "x":
        newAnswer = prevNumber * currentNumber;
        // this.updateHistory(newAnswer + "<br>");
        break;
      case "/":
        newAnswer = prevNumber / currentNumber;
        // this.updateHistory(newAnswer + "<br>");
        break;
      default:
        return;
    }
    this.current = newAnswer;
    this.operation = undefined;
    this.updateHistory(newAnswer + "<br>");
  }
  displayAnswer() {
    this.currentText.innerHTML = this.current;
    this.previousText.innerHTML = this.current;
  }

  updateHistory(value) {
    historyVal += value;
    history.innerHTML = historyVal;
    history.innerHTML += "<br>";
  }

  clearHistory() {
    historyVal = "";
    history.innerHTML = "";
  }
}
const calculatorBody = document.querySelector("#calculator_body");
const buttons = calculatorBody.querySelectorAll("#buttons");
const answerBox = document.querySelector("#answer");

//const answer = document.getElementById("answer");

const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const equals = document.getElementById("equals");
const clearHistory = document.getElementById("clear-history");
const previousText = document.querySelector("#previous");
const currentText = document.querySelector("#current");

const calculator = new Calculator(previousText, currentText);

document.addEventListener("keydown", (e) => {});
clear.addEventListener("click", (e) => {
  calculator.clear();
});

Array.from(numbers).forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.addNumber(button.innerHTML);
    calculator.displayAnswer();
    console.log(button.innerHTML);
  });
});

Array.from(numbers).forEach((button) => {
  button.addEventListener("keydown", (e) => {
    if (e.isComposing || e.code === "Digit1") {
      calculator.addNumber(1);
      calculator.displayAnswer();
      console.log(1);
    }
    if (e.isComposing || e.code === "Digit2") {
      calculator.addNumber(2);
      calculator.displayAnswer();
      console.log(2);
    }
    if (e.isComposing || e.code === "Digit3") {
      calculator.addNumber(3);
      calculator.displayAnswer();
      console.log(3);
    }
    if (e.isComposing || e.code === "Digit4") {
      calculator.addNumber(4);
      calculator.displayAnswer();
      console.log(4);
    }
    if (e.isComposing || e.code === "Digit5") {
      calculator.addNumber(5);
      calculator.displayAnswer();
      console.log(5);
    }
    if (e.isComposing || e.code === "Digit6") {
      calculator.addNumber(6);
      calculator.displayAnswer();
      console.log(6);
    }
    if (e.isComposing || e.code === "Digit7") {
      calculator.addNumber(7);
      calculator.displayAnswer();
      console.log(7);
    }
    if (e.isComposing || e.code === "Digit8") {
      calculator.addNumber(8);
      calculator.displayAnswer();
      console.log(8);
    }
    if (e.isComposing || e.code === "Digit9") {
      calculator.addNumber(9);
      calculator.displayAnswer();
      console.log(9);
    }
    if (e.isComposing || e.code === "Digit0") {
      calculator.addNumber(0);
      calculator.displayAnswer();
      console.log(0);
    }
  });
});

Array.from(operators).forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.chooseOperation(button.innerHTML);
    calculator.displayAnswer();
    console.log(button.innerHTML);
  });
});

Array.from(operators).forEach((button) => {
  button.addEventListener("keydown", (e) => {
    if (e.isComposing || (e.key == "Equal" && e.shiftKey)) {
      calculator.chooseOperation(button.innerHTML);
      calculator.displayAnswer();
      console.log(button.innerHTML);
    }
    if (e.isComposing || e.keyCode === "Minus") {
      calculator.chooseOperation(button.innerHTML);
      calculator.displayAnswer();
      console.log(button.innerHTML);
    }
    if (e.isComposing || e.key == "Slash") {
      calculator.chooseOperation(button.innerHTML);
      calculator.displayAnswer();
      console.log(button.innerHTML);
    }
    if (e.isComposing || e.key == "KeyX") {
      calculator.chooseOperation(button.innerHTML);
      calculator.displayAnswer();
      console.log(button.innerHTML);
    }
  });
});

decimal.addEventListener("click", (e) => {
  calculator.addNumber(decimal.innerHTML);
  calculator.displayAnswer();
});

decimal.addEventListener("keydown", (e) => {
  if (e.isComposing || e.key == "Period") {
    calculator.addNumber(decimal.innerHTML);
    calculator.displayAnswer;
  }
});

clear.addEventListener("click", (e) => {
  calculator.clear();
  calculator.displayAnswer();
});

equals.addEventListener("click", (e) => {
  calculator.calculate();
  calculator.displayAnswer();
});

equals.addEventListener("keydown", (e) => {
  if (e.isComposing || e.key === "=") {
    calculator.calculate();
    calculator.displayAnswer();
  }
});

clearHistory.addEventListener("click", (e) => {
  calculator.clear();
  calculator.clearHistory();
  calculator.displayAnswer();
});
