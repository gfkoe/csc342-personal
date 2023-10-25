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
      // .then((data) => data.json())
      .then((res) => {
        if (res.ok) {
          // sessionStorage.setItem("user", `${res.id}`);
          // sessionStorage.setItem("username", `${res.username}`);
          window.location.href = "/home";
          // return res;
        } else {
          alert("invalid username");
          console.error("Authentication failed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
