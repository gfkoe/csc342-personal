const express = require("express");
const frontendRouter = express.Router();


const path = require("path");
const html_dir = path.join(__dirname, "../../templates/");

frontendRouter.get("/", (req, res) => {
  res.sendFile(`${html_dir}login.html`);
});

frontendRouter.get("/home", (req, res) => {
  res.sendFile(`${html_dir}home.html`);
});

module.exports = frontendRouter;
