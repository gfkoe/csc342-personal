import api from "./APIClient.js";

// Get id from URL
const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get("id");
console.log(id);

//Retrieve User
api.getUser(id).then((user) => {
  updateUserBlock(user);
});

api.getHowlsByUser(id).then((howls) => {
  updateHowls(howls);
});

function updateUserBlock(user) {
  const userInfo = document.getElementById("user_info");
  const usernameText = document.createElement("p");
  const usernameTextDiv = document.getElementById("user_info_username");
  usernameText.innerHTML = "@" + user.user.username;
  const userBody = document.getElementById("user_body");
  const userBodyText = document.createElement("p");
  usernameTextDiv.appendChild(usernameText);
}

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
  const date = document.createElement("footer");
  date.innerHTML = howl.datetime;
  date.className = "blockquote-footer";
  api.getUser(howl.userId).then((user) => {
    const userLink = document.createElement("a");
    userLink.href = "/user?id=" + user.user.id;
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
