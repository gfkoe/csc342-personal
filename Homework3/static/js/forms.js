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
  const message = document.querySelector("");
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
  });
});
