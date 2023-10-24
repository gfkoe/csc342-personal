const express = require("express");
const router = express.Router();

let follows = require("./data/follows.json");
let howls = require("./data/howls.json");
let users = require("./data/users.json");

router.get("/follows", (req, res) => {
  res.json(follows);
});

router.get("/follows/:id", (req, res) => {
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

router.get("/howls", (req, res) => {
  res.json(howls);
});

router.get("/users", (req, res) => {
  res.json(users);
});

module.exports = router;
