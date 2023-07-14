const express = require("express");
const controller = require("../controllers/progressController");
const bodyparser = require("body-parser");
const { auth } = require("../middlewares/basicAuth");

const route = express.Router();

route.use(bodyparser.json());

route.get("/progress", controller.findAll);

route.get("/progress/:progress_id", controller.findOne);

route.post("/progress", auth, controller.save);

route.put("/progress/:progress_id", auth, controller.update);

route.delete("/progress/:progress_id", auth, controller.del);

module.exports = { route };