const express = require("express");
const apiRouter = express.Router();

let follows = require("../data/follows.json");
let howls = require("../data/howls.json");
let users = require("../data/users.json");
let authenticateduser = "";
apiRouter.use(express.json());
apiRouter.use((req, res, next) => {
  const { username } = req.body;
  authenticateduser = users.find((user) => user.username === username);
  next();
});
apiRouter.post("/login", (req, res) => {
  if (authenticateduser) {
    // res.json(authenticateduser);
    res.json({ message: "Authentication successful", user: req.user });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// //authenticate
// apiRouter.post("/login", (req, res) => {
//   if (authenticateduser) {
//     res.json({ message: "Authentication successful", user: authenticateduser });
//   } else {
//     res.status(401).json({ message: "Authentication failed" });
//   }
// });

//Getting the currently "authenticated" user's object.
apiRouter.get("/user", (req, res) => {
  if (authenticateduser) {
    res.json(getFilteredUser(authenticateduser)); // Send the authenticated user object
  } else {
    res.status(404).json({ error: "Not Found" }); // Send a 404 response if user not found
  }
});

//Creating a new howl.
apiRouter.post("/create", (req, res) => {
  res.json({ message: "Howl successfully created" });
});

//Getting howls posted by a specific user
apiRouter.get("/users/:username/howls", (req, res) => {
  const username = req.params.username;

  res.json({});
});

//Getting howls posted by all users followed by the "authenticated" user
apiRouter.get("/following/howls", (req, res) => {
  const id = req.params.userId;
  let idFollows = follows[idFollows].following;
  res.json({});
});

//Getting a specific user's object
apiRouter.get("/users/:username", (req, res) => {
  const username = req.params.username;

  res.json({});
});

//Getting the list of users followed by a specific user
apiRouter.get("/users/:username/following", (req, res) => {
  let username = req.params.username;
  const usernameId = username.id;
  let matchedFollows = follows[usernameId].following;
  res.json({ matchedFollows });
});

//Following a user
apiRouter.post("/users/:username/follow", (req, res) => {
  let username = req.params.username;
  let usernameId = username.id;
  follows[usernameId];
  res.json({});
});

//Unfollowing a user
apiRouter.post("/users/:username/unfollow", (req, res) => {
  const username = req.params.username;

  res.json({});
});

apiRouter.get("/follows/:id", (req, res) => {
  let followId = req.params.id;
  let follow = follows.find((item) => {
    return item.id == followId;
  });
  if (!follow) {
    res.status(404).json({ error: "Not found" });
  } else {
    res.json(follow);
  }
});

apiRouter.get("/howls", (req, res) => {
  res.json(howls);
});

apiRouter.get("/users", (req, res) => {
  res.json(users);
});

function getFilteredUser(user) {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    avatar: user.avatar,
  };
}

module.exports = apiRouter;
