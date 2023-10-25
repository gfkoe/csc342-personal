const express = require("express");

const app = express();
const PORT = process.env.PORT;
// const PORT = 80;

app.use(express.static("static"));

const routes = require("./src/routes");
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
