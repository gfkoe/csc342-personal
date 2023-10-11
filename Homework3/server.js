const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "/Homework3/static/uploads" });

const app = express();
const PORT = 3000;

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
