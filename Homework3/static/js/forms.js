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
  const messageLength = document.getElementById("message").value.length;
  const cardNumber = document.querySelector("#cardNumberInput");
  const currentDate = new Date();
  const creditDate = document.querySelector("#expiration");
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
  });
});
