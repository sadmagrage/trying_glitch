const express = require('express');
const cors = require("cors");

const comidaRouter = require("./routes/comidaRoute");
const progressRouter = require("./routes/progressRoute");

const app = express();

app.use(cors({ origin: "https://sadmagrage.github.io" }));

app.use(comidaRouter.route);
app.use(progressRouter.route);

const port = 3000;
app.listen(port, () => console.log(`running on port ${port}`));