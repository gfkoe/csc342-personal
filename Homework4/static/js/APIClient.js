import HTTPClient from "./HTTPClient.js";
const API_BASE = "/api";

export default {
  getCurrentUser: () => {
    return HTTPClient.get(API_BASE + "/users/current");
  },

  createHowl: (text) => {
    let data = {
      text: text,
    };

    return HTTPClient.post(API_BASE + "/users/current/howls/create", data);
  },

  getHowlsByUser: (userId) => {
    return HTTPClient.get(API_BASE + `/users/${userId}` + "/howls");
  },

  getHowls: () => {
    return HTTPClient.get(API_BASE + "/howls");
  },

  getHowlsFromUserFollowing: () => {
    return HTTPClient.get(API_BASE + "/users/current/following/howls");
  },

  getUser: (userId) => {
    return HTTPClient.get(API_BASE + `/users/${userId}`);
  },

  getFollowing: (userId) => {
    return HTTPClient.get(API_BASE + `/users/${userId}` + "/following");
  },

  follow: (userId) => {
    return HTTPClient.post(API_BASE + `/users/${userId}` + "/follow");
  },

  unfollow: (userId) => {
    return HTTPClient.post(API_BASE + `/users/${userId}` + "/unfollow");
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
