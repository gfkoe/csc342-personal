import api from "./APIClient.js";

addEventListener("DOMContentLoaded", (e) => {
  let userBtn = document.getElementById("userbutton");
  userBtn.addEventListener("click", (e) => {
    api
      .getCurrentUser()
      .then((currentUser) => {
        console.log(currentUser);
      })
      .catch((err) => {
        console.log("error");
      });
  });
});
