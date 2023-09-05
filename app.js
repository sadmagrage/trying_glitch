const express = require('express');
const cors = require("cors");

const homeRouter = require("./routes/homeRoute");
const comidaRouter = require("./routes/comidaRoute");
const progressRouter = require("./routes/progressRoute");

const app = express();

//app.use(cors({origin: "*" }));
app.use(cors({ origin: "https://sadmagrage.github.io" }));

app.use(homeRouter.route);
app.use(comidaRouter.route);
app.use(progressRouter.route);

const port = 3000;
app.listen(port, () => console.log(`running on port ${port}`));
