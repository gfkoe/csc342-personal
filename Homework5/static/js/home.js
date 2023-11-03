import api from "./APIClient.js";

api
  .getCurrentUser()
  .then((user) => {
    updateUserBlock(user);
  })
  .catch((error) => {
    if (error.status === 401) {
      console.log("We are not logged in");
      document.location = "/login";
    } else {
      console.log(`${error.status}`, error);
    }
  });

function updateUserBlock(user) {
  const userInfo = document.getElementById("user_info");
  const usernameText = document.createElement("p");

  const usernameTextDiv = document.getElementById("user_info_username");
  const button = document.createElement("button");
  button.className = "btn btn-primary btn-block mb-4";
  button.innerHTML = "Logout";
  button.id = "logout_button";

  usernameText.innerHTML = "@" + user.username;
  const userBody = document.getElementById("user_body");
  const userBodyText = document.createElement("p");
  userBodyText.innerHTML = user.first_name + " " + user.last_name;

  button.addEventListener("click", (e) => {
    e.preventDefault();
    api.logOut().then(() => {
      document.location = "/login";
    });
  });
  userBody.appendChild(userBodyText);
  usernameTextDiv.appendChild(usernameText);
  userBody.append(usernameTextDiv);
  userBody.append(button);
}
