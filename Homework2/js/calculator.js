const calculator = document.querySelector(".calculator_body");
const buttons = document.querySelector(".number");

buttons.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    //FIXME
    const key = e.target;
    const content = key.textContent;
  }
});
