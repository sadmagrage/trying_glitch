const express = require("express");
const controller = require("../controllers/progressController");
const bodyparser = require("body-parser");
const { auth } = require("../middlewares/basicAuth");

const route = express.Router();

route.get("/progress/convert", controller.convertTimestamp);

route.get("/progress", controller.findAll);

route.get("/progress/form", auth, controller.formGet);

route.post("/progress/form", express.urlencoded(), controller.formPost);

route.get("/progress/:progress_id", controller.findOne);

route.post("/progress", auth, bodyparser.json(), controller.save);

route.put("/progress/:progress_id", auth, bodyparser.json(), controller.update);

route.delete("/progress/:progress_id", auth, controller.del);

module.exports = { route };