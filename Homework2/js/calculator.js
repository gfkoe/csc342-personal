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
    this.operation = operation;
    this.previous = this.current;
    this.updateHistory(this.current + "\n");
    this.current = "";
  }
  calculate() {
    let newAnswer = 0;
    const prevNumber = parseFloat(this.previous);
    const currentNumber = parseFloat(this.current);
    switch (this.operation) {
      case "+":
        newAnswer = prevNumber + currentNumber;
        this.updateHistory(newAnswer + "\n");
        break;
      case "-":
        newAnswer = prevNumber - currentNumber;
        this.updateHistory(newAnswer + "\n");
        break;
      case "x":
        newAnswer = prevNumber * currentNumber;
        this.updateHistory(newAnswer + "\n");
        break;
      case "/":
        newAnswer = prevNumber / currentNumber;
        this.updateHistory(newAnswer + "\n");
        break;
      default:
        return;
    }
    this.current = newAnswer;
    this.operation = undefined;
    this.previous = "";
  }
  displayAnswer() {
    this.currentText.innerHTML = this.current;
    this.previousText.innerHTML = this.current;
    this.updateHistory(this.current.innerHTML + "\n");
  }

  updateHistory(value) {
    historyVal += value;
    history.innerHTML = historyVal;
    history.innerHTML += "\n";
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

Array.from(operators).forEach((button) => {
  button.addEventListener("click", (e) => {
    calculator.chooseOperation(button.innerHTML);
    calculator.displayAnswer();
    console.log(button.innerHTML);
  });
});

decimal.addEventListener("click", (e) => {
  calculator.addNumber(decimal.innerHTML);
  calculator.displayAnswer();
});

clear.addEventListener("click", (e) => {
  calculator.clear();
  calculator.displayAnswer();
});

equals.addEventListener("click", (e) => {
  calculator.calculate();
  calculator.displayAnswer();
});

clearHistory.addEventListener("click", (e) => {
  calculator.clear();
  calculator.clearHistory();
  calculator.displayAnswer();
});
Array.from(numbers).forEach((button) => {
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
