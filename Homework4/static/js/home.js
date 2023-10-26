import api from "./APIClient.js";

addEventListener("DOMContentLoaded", (e) => {
  let userBtn = document.getElementById("userbutton");
  userBtn.addEventListener("click", (e) => {
    fetch("/api/users/current", {
      method: "GET",
    })
      // .then((res) => {
      //   if (!res.ok) {
      //     throw new Error("response was not ok");
      //   }
      //   return res.text();
      // })
      .then((data) => {
        try {
          const userDataDiv = document.getElementById("userData");
          userDataDiv.innerHTML = `
            <p>ID: ${data.id}</p>
            <p>First Name: ${data.first_name}</p>
            <p>Last Name: ${data.last_name}</p>
            <p>Username: ${data.username}</p>
            <p>Avatar: ${data.avatar}</p>
          `;
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle the error - maybe display an error message to the user
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
});

api.getHowlsFromUserFollowing().then((howls) => {
  updateHowls(howls);
});

function updateHowls(howls) {
  resetHowls();
  fillHowlHTMLs();
}
function resetHowls(howls) {
  const howlList = document.getElementById("howl_list");
  howlList.innerHTML = "";
}
function fillHowlsHTML() {
  const howls = document.getElementById("howl_list");
  howls.forEach((howl) => {
    howls.append(createHowlHTML(howl));
  });
}

function createHowlHTML(howl) {
  const item = document.createElement("div");
  item.classList.add("howl");
  item.href = "/howl?id=" + howl.id;

  const name = document.createElement("h2");
  name.innerHTML = howl.name;
  item.appendChild(name);
  return item;
}
