const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "static/uploads" });

const app = express();
const PORT = 3000;
const html_path = __dirname + "/templates/";
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(html_path + "form.html");
});

app.post("/formdata", upload.single("myfile"), (req, res) => {
  try {
    if (req.body.senderFirst == "") {
      throw new Error("sender first name required");
    }
    if (req.body.senderLast == "") {
      throw new Error("sender first name required");
    }
    if (req.body.recipientFirst == "") {
      throw new Error("sender first name required");
    }
    if (req.body.recipientLast == "") {
      throw new Error("sender first name required");
    }
    if (req.body.recipientLast == "Dent") {
      if (
        req.body.recipientFirst == "Stu" ||
        req.body.recipientFirst == "Stuart"
      ) {
        res.sendFile(html_path + "error.html");
      }
    }

    res.sendFile(html_path + "success.html");
  } catch (err) {
    res.send("Validation failed. " + error);
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
