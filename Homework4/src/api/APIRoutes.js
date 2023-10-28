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
  // const user = req.session.user;
  const userId = req.session.user.id;
  console.log(req.body.text);
  const newHowl = {
    id: howls.length + 1, // Assign a unique ID to the new howl
    userId: userId,
    datetime: new Date().toISOString(), // Current datetime in ISO format
    text: req.body.text,
  };

  howls.push(newHowl);
  res.status(201).json(newHowl);
});

//Getting howls posted by a specific user
apiRouter.get("/users/:userId/howls", SessionMiddleware, (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  // const howlsFromUser = [];
  const userHowls = howls.filter((howl) => howl.userId === userId);
  // howlsFromuser.push(...userHowls);
  userHowls.sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );
  res.json(userHowls);
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

    followingHowls.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    res.json(followingHowls);
  }
);

//Getting a specific user's object
apiRouter.get("/users/:userId", SessionMiddleware, (req, res) => {
  const id = req.params.userId;

  UserDAO.getUserById(id)
    .then((user) => {
      let result = {
        user: user,
      };
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(err.code).json({ error: err.message });
    });
});

//Getting the list of users followed by a specific user
apiRouter.get("/users/:userId/following", SessionMiddleware, (req, res) => {
  const usernameId = req.params.userId;
  let matchedFollows = follows[usernameId].following;
  res.json({ matchedFollows });
});

//Following a user
apiRouter.post("/users/:userId/follow", SessionMiddleware, (req, res) => {
  const followId = req.params.userId;
  console.log(followId);
  // const usernameId = username.id;
  const userId = req.session.user.id;
  follows[userId].following.push(followId);
  res.send(followId);
});

//Unfollowing a user
apiRouter.post("/users/:userId/unfollow", SessionMiddleware, (req, res) => {
  const unfollowId = req.body.userId;
  // const usernameId = username.id;
  const userId = req.session.user.id;
  follows[userId].following = follows[userId].following.filter(
    (id) => id !== unfollowId
  );

  res.send(unfollowId);
});

module.exports = apiRouter;
