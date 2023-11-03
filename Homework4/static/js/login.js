import api from "./APIClient.js";
addEventListener("DOMContentLoaded", (e) => {
  const username = document.querySelector("#username");
  const signinButton = document.querySelector("#loginButton");
  signinButton.addEventListener("click", (e) => {
    api
      .logIn(username.value)
      .then((userData) => {
        localStorage.setItem("user", JSON.stringify(userData.user));
        document.location = "./";
      })
      .catch((err) => {

        console.error(err);
      });


  });
});
