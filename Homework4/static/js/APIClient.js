const API_BASE = "/api";

class HTTPClient {
  static get(url) {
    return fetch(`${API_BASE}${url}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  static post(url, data) {
    // TODO: Implement
  }
}

export default {};
