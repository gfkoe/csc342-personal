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
  const button = document.createElement("button");
  button.className = "btn btn-primary btn-block mb-4";
  button.innerHTML = "Follow";
  button.id = "follow_button";

  usernameText.innerHTML = "@" + user.user.username;
  const userBody = document.getElementById("user_body");
  const userBodyText = document.createElement("p");
  userBodyText.innerHTML = user.user.first_name + " " + user.user.last_name;
  button.addEventListener("click", (e) => {
    api
      .follow(user.user.id)
      .then((newUser) => {})
      .catch((err) => {
        // errorBox.classList.remove("hidden");
        // errorBox.innerHTML = err;
        console.error(err);
      });
  });
  userBody.appendChild(userBodyText);
  const img = document.createElement("img");
  img.className = "profile_picture";
  img.src = user.user.avatar;
  usernameTextDiv.appendChild(img);
  usernameTextDiv.appendChild(usernameText);
  usernameTextDiv.appendChild(button);
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
