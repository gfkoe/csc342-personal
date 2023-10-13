const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "static/uploads" });

const app = express();
const PORT = 3000;
const html_path = __dirname + "templates/";
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(html_path + "form.html");
});

app.post("/formdata", upload.single("myfile"), (req, res) => {
  console.log(req.body);
  try {
    if (req.body.sendFirstInput == "") {
      throw new Error("sender first name required");
    }
    if (req.body.sendLastInput == "") {
      throw new Error("sender last name required");
    }
    if (req.body.recFirstInput == "") {
      throw new Error("recipient first name required");
    }
    if (req.body.recLastInput == "") {
      throw new Error("recipient last name required");
    }
    if (req.body.recLastInput === "dent") {
      if (
        req.body.recFirstInput === "stu" ||
        req.body.recFirstInput === "stuart"
      ) {
        res.sendFile(html_path + "error.html");
      }
    }
    if (req.body.cardNumberInput == "") {
      throw new Error("Card number required");
    }
    if (req.body.message == "") {
      throw new Error("message required");
    }

    res.sendFile(html_path + "success.html");
  } catch (err) {
    res.send("Validation failed. " + err);
  }
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
