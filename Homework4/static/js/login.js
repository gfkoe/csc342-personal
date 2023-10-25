import api from "./APIClient.js";
addEventListener("DOMContentLoaded", (e) => {
  let usernameInput = document.getElementById("username");
  let signinButton = document.getElementById("signin");
  signinButton.addEventListener("click", (e) => {
    const username = usernameInput.value;
    fetch("/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (res.ok) {
          window.location.href = "/home";
        } else {
          console.error("Authentication failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
