const express = require("express");
const apiRouter = express.Router();

let follows = require("../data/follows.json");
let howls = require("../data/howls.json");
let users = require("../data/users.json");
apiRouter.use(express.json());

apiRouter.use((req, res, next) => {
  const { username } = req.body;
  req.user = users.find((user) => user.username === username);
  next();
});

// apiRouter.get("/follows", (req, res) => {
//   res.json(follows);
// });

//authenticate
apiRouter.post("/login", (req, res) => {
  console.log("login request: ", req.body);
  res.status(200).json({ authenticated: true });
});

//Getting the currently "authenticated" user's object.
apiRouter.get("/user", (req, res) => {
  res.json(req.user);
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
  const username = req.params.username;

  res.json({});
});

//Following a user
apiRouter.post("/users/:username/follow", (req, res) => {
  const username = req.params.username;

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

module.exports = apiRouter;
