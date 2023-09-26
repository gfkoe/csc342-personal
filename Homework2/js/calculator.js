const calculator = document.querySelector(".calculator_body");
const buttons = document.querySelector(".number");

buttons.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    //FIXME
    const key = e.target;
    const action = key.dataset.action;
    const content = key.textContent;
    const displayed = displayed.textContent;
  }
});
