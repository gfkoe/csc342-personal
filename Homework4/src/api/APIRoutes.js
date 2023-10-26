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

//Getting the currently "authenticated" user's object.
apiRouter.get("/users/current", SessionMiddleware, (req, res) => {
  res.json(req.session.user);
});

//Creating a new howl.
apiRouter.post("/users/current/howls/create", SessionMiddleware, (req, res) => {
  const user = req.session.user;
  const userId = req.session.user.id;

  const { text } = req.body;

  const newHowl = {
    id: howlsData.length + 1, // Assign a unique ID to the new howl
    userId: userId,
    datetime: new Date().toISOString(), // Current datetime in ISO format
    text: text,
  };

  howls.push(newHowl);
  res.status(201).json(newHowl);
});

//Getting howls posted by a specific user
apiRouter.get("/users/:username/howls", (req, res) => {
  const username = req.params.username;
  const usernameId = username.id;
  const howlsFromUser = howls.filter((howl) => howl.userId === usernameId);
  res.json({ howlsFromUser });
});

//Getting howls posted by all users followed by the "authenticated" user
apiRouter.get(
  "/users/current/following/howls",
  SessionMiddleware,
  (req, res) => {
    const user = req.session.user;
    const userId = user.id;
    const id = req.params.userId;

    const following = follows[userId].following;
    const followingHowls = [];
    for (const followingUserId of following) {
      const howlsFromUser = howls.filter(
        (howl) => howl.userId === followingUserId
      );
      followingHowls.push(...howlsFromUser);
    }

    followingHowls.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    const formattedHowls = followingHowls.map((howl) => ({
      id: howl.id,
      userId: howl.userId,
      datetime: howl.datetime,
      text: howl.text,
      // Add other properties as needed
    }));
    res.json(formattedHowls);
  }
);

//Getting a specific user's object
apiRouter.get("/users/:username", SessionMiddleware, (req, res) => {
  const username = req.params.username;
  const usernameId = username.id;
  UserDAO.getUserByCredentials(username)
    .then((user) => {
      let result = {
        user: user,
      };
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(err.code).json({ error: err.message });
    });
});

//Getting the list of users followed by a specific user
apiRouter.get("/users/:username/following", SessionMiddleware, (req, res) => {
  const username = req.params.username;
  const usernameId = username.id;
  let matchedFollows = follows[usernameId].following;
  res.json({ matchedFollows });
});

//Following a user
apiRouter.post("/users/:username/follow", SessionMiddleware, (req, res) => {
  const username = req.params.username;
  const usernameId = username.id;
  const userId = req.session.user.id;
  follows[userId].following.push(usernameId);
  res.send("Now following user: " + usernameId);
});

//Unfollowing a user
apiRouter.post("/users/:username/unfollow", SessionMiddleware, (req, res) => {
  const username = req.params.username;
  const usernameId = username.id;
  const userId = req.session.user.id;
  follows[userId].following = follows[userId].following.filter(
    (id) => id !== usernameId
  );

  res.send("Now unfollowing user: " + usernameId);
});

module.exports = apiRouter;
