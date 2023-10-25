const API_BASE = "/api";

class HTTPClient {
  static get(url) {
    return fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error("error in request");
      }
      return res.json();
    });
  }
}

export default {
  getCurrentUser: (username) => {
    return HTTPClient.get(`/api/${username}`).then((user) => {
      return user;
    });
  },
};
