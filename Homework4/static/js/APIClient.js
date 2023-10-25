import HTTPClient from "./HTTPClient.js";
const API_BASE = "/api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },

  logIn: (username) => {
    let data = {
      username: username,
    };
    return HTTPClient.post(API_BASE + "/users/login", data);
  },

  // logOut: () => {
  //   return HTTPClient.post(API_BASE+'/users/logout', {});
  // }
};
