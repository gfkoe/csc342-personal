const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 80;
const html_path = __dirname + "/templates/";
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(html_path + "form.html");
});

const upload = multer({ "static/uploads/" });
//
app.post("/formdata", upload.single("imageInput"), (req, res) => {
  console.log(req.body);
  if (
    (req.body.recFirstInput.toLowerCase() == "stuart" &&
      req.body.recLastInput.toLowerCase() == "dent") ||
    (req.body.recFirstInput.toLowerCase() == "stu" &&
      req.body.recLastInput.toLowerCase() == "dent")
  ) {
    res.sendFile(html_path + "error.html");
  } else {
    res.sendFile(html_path + "success.html");
  }
  try {
    if (req.body.sendFirstInput == "") {
      throw new Error("sender first name required");
    }
    if (req.body.sendLastInput == "") {
      throw new Error("sender first name required");
    }
    if (req.body.recFirstInput == "") {
      throw new Error("sender first name required");
    }
    if (req.body.recLastInput == "") {
      throw new Error("sender first name required");
    }
  } catch (err) {
    res.send("Validation failed. " + err);
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
