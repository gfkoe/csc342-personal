const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./src/routes");
const frontendRoutes = require("./src/frontendRoutes");

app.use(frontendRoutes);
app.use("/api/v1", apiRoutes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
