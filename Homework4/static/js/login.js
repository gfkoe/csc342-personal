import api from "./APIClient.js";
addEventListener("DOMContentLoaded", (e) => {
  let signinButton = document.getElementById("signin");
  signinButton.addEventListener("click", (e) => {
    fetch("/api/APIRoutes/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => {
        window.location.href = "/home";
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
