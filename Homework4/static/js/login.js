import api from "./APIClient.js";
addEventListener("DOMContentLoaded", (e) => {
  const username = document.querySelector("#username");
  const signinButton = document.querySelector("#loginButton");
  signinButton.addEventListener("click", (e) => {
    api
      .logIn(username.value)
      .then((userData) => {
        localStorage.setItem("user", JSON.stringify(userData.user));
        document.location = "/";
      })
      .catch((err) => {
        // errorBox.classList.remove("hidden");
        // errorBox.innerHTML = err;
        console.error(err);
      });

    // const username = usernameInput.value;
    // fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({ username }),
    // })
    //   // .then((data) => data.json())
    //   .then((res) => {
    //     if (res.ok) {
    //       // sessionStorage.setItem("user", `${res.id}`);
    //       // sessionStorage.setItem("username", `${res.username}`);
    //       window.location.href = "/home";
    //     } else {
    //       alert("invalid username");
    //       console.error("Authentication failed");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  });
});
