import HTTPClient from "./HTTPClient.js";
const API_BASE = "/api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },

  createHowl: () => {
    return HTTPClient.post(API_BASE + "/users/current/howls/create");
  },

  getHowlsByUser: (username) => {
    return HTTPClient.get(API_BASE + "/users/" + username + "/howls");
  },

  getHowls: () => {
    return HTTPClient.get(API_BASE + "/howls");
  },

  getHowlsFromUserFollowing: () => {
    return HTTPClient.get(API_BASE + "/users/current/following/howls");
  },

  getUser: (username) => {
    return HTTPClient.get(API_BASE + "/users/" + username);
  },

  getFollowing: (username) => {
    return HTTPClient.get(API_BASE + "/users/" + username + "/following");
  },

  follow: (username) => {
    return HTTPClient.post(API_BASE + "/users/" + username + "/follow");
  },

  unfollow: (username) => {
    return HTTPClient.post(API_BASE + "/users/" + username + "/unfollow");
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
