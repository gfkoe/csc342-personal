const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 3000;
const html_path = __dirname + "templates/";
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(html_path + "form.html");
});

// upload.single("myfile"),
app.post("/formdata", (req, res) => {
  console.log(req.body);
  if (
    (req.body.recFirstInput === "Stuart" && req.body.recLastInput == "Dent") ||
    (req.body.recFirstInput === "Stu" && req.body.recLastInput == "Dent")
  ) {
    res.sendFile(html_path + "error.html");
  } else {
    res.sendFile(html_path + "success.html");
  }
  // try {

  // } catch (err) {
  //   res.send("Validation failed. " + err);
  // }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
