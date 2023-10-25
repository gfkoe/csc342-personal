const express = require("express");
const cookieParser = require("cookie-parser");

const apiRouter = express.Router();

let follows = require("../data/follows.json");
let howls = require("../data/howls.json");

apiRouter.use(cookieParser());
apiRouter.use(express.json());

const UserDAO = require("./UserDAO");

const {
  SessionMiddleware,
  initializeSession,
  removeSession,
} = require("../middleware/SessionCookieMiddleware");

apiRouter.post("/users/login", (req, res) => {
  if (req.body.username) {
    UserDAO.getUserByCredentials(req.body.username)
      .then((user) => {
        let result = {
          user: user,
        };

        initializeSession(req, res, user);

        res.json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(err.code).json({ error: err.message });
      });
  } else {
    res.status(401).json({ error: "Not authenticated" });
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
apiRouter.get("/users/current", SessionMiddleware, (req, res) => {
  res.json(req.session.user);
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
