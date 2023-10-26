let users = require("../data/users.json");

//This file mimics making asynchronous request to a database
module.exports = {
  getUserByCredentials: (username) => {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.username == username);
      if (user) {
        // we found our user
        console.log(user);
        resolve(getFilteredUser(user));
      } else {
        // if no user with provided username
        reject({ code: 401, message: "No such user" });
      }
    });
  },
};

function getFilteredUser(user) {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    avatar: user.avatar,
  };
}
