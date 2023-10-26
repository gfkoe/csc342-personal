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
  console.log(howls);
  updateHowls(howls);
});

function updateHowls(howls) {
  resetHowls(howls);
  fillHowlsHTML(howls);
}
function resetHowls(howls) {
  const howlList = document.getElementById("howl_list");
  howlList.innerHTML = "";
}
function fillHowlsHTML(howls) {
  const howlList = document.getElementById("howl_list");
  howls.forEach((howl) => {
    howlList.append(createHowlHTML(howl));
    const br = document.createElement("br");
    howlList.append(br);
  });
}

function createHowlHTML(howl) {
  const item = document.createElement("div");

  item.className = "card";
  const cardHeader = document.createElement("div");
  const cardBody = document.createElement("div");
  const quoteBody = document.createElement("blockquote");
  const text = document.createElement("p");

  cardHeader.className = "card-header";
  cardBody.className = "card-body";
  quoteBody.className = "blockquote mb-0";

  // api.getUser(howl.userId).then;
  text.innerHTML = howl.text;
  cardHeader.innerHTML = user.id;
  quoteBody.appendChild(text);
  cardBody.appendChild(quoteBody);

  item.appendChild(cardHeader);
  item.appendChild(cardBody);

  item.classList.add("howl");

  return item;
}
