import api from "./APIClient.js";

addEventListener("DOMContentLoaded", (e) => {
  const postHowl = document.querySelector("#postHowl");
  const text = document.querySelector("#text_box");

  postHowl.addEventListener("click", (e) => {
    // console.log(text.value);
    api
      .createHowl(text.value)
      .then((howlData) => {
        // updateHowls(howlData);
      })
      .catch((err) => {
        // errorBox.classList.remove("hidden");
        // errorBox.innerHTML = err;
        console.error(err);
      });
  });
});
api.getCurrentUser().then((user) => {
  console.log(user);
  const userLink = document.getElementById("userbutton");

  userLink.href = "/user?id=" + user.id;
  userLink.innerHTML = "@" + user.username;
});
api.getHowlsFromUserFollowing().then((howls) => {
  // console.log(howls);
  updateHowls(howls);
});

function updateHowls(howls) {
  // resetHowls(howls);
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
  const date = document.createElement("footer");
  date.innerHTML = howl.datetime;
  date.className = "blockquote-footer";
  api.getUser(howl.userId).then((user) => {
    const userLink = document.createElement("a");
    userLink.href = "./user?id=" + user.user.id;
    userLink.innerHTML = "@" + user.user.username;
    //cardHeader.innerHTML = "@" + user.username;
    cardHeader.appendChild(userLink);
  });

  text.innerHTML = howl.text;
  quoteBody.appendChild(text);
  quoteBody.appendChild(date);

  cardBody.appendChild(quoteBody);

  item.appendChild(cardHeader);
  item.appendChild(cardBody);

  item.classList.add("howl");

  return item;
}
