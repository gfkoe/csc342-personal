const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
function previewSelectedImage() {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
  }
}
imageInput.addEventListener("change", previewSelectedImage);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const senderFirst = document.querySelector("#sendFirstInput");
  const senderLast = document.querySelector("#sendLastInput");
  const recipientFirst = document.querySelector("#recFirstInput");
  const recipientLast = document.querySelector("#recLastInput");
  const message = document.getElementById("message");
  const cardNumber = document.querySelector("#cardNumberInput");
  const currentDate = new Date();
  const creditDate = document.querySelector("#expiration");
  const emailCheck = document.getElementById("emailButton");
  const emailInput = document.getElementById("emailInput");
  const smsCheck = document.getElementById("sms");
  const smsInput = document.getElementById("phone");
  const notifyCheck = document.getElementById("do_not_notify");
  const ccv = document.getElementById("ccv");
  form.addEventListener("submit", (e) => {
    if (senderFirst == "") {
      e.preventDefault();
    }
    if (senderLast == "") {
      e.preventDefault();
    }
    if (recipientFirst == "") {
      e.preventDefault();
    }
    if (recipientLast == "") {
      e.preventDefault();
    }
    if (creditDate < currentDate) {
      e.preventDefault();
    }
    if (creditDate == "") {
      e.preventDefault();
    }
    if (cardNumber == "") {
      e.preventDefault();
    }
    if (emailCheck.checked) {
      if (emailInput === "" || emailInput === null) {
        alert("email is required");
        e.preventDefault();
      }
    }
    if (smsCheck.checked) {
      if (smsInput === "" || smsInput === null) {
        alert("sms is required");
        e.preventDefault();
      }
    }
    if (ccv.value.length < 3 || ccv.value.length > 4) {
      alert("ccv must be 3 or 4 digits");
      e.preventDefault();
    }
    if (message.value.length < 10) {
      alert("message must be at least 10 characters long");
      e.preventDefault();
    }
  });
});
