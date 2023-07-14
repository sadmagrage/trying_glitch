const express = require("express");
const bodyparser = require("body-parser");

const controller = require("../controllers/comidaController");
const middleware = require("../middlewares/basicAuth");

const route = express.Router();

route.use(bodyparser.json());

route.get("/comida", controller.findAll);

route.get("/comida/:comida_id", controller.findOne);

route.post("/comida/", middleware.auth, controller.save);

route.put("/comida/:comida_id", middleware.auth, controller.update);

route.delete("/comida/:comida_id", middleware.auth, controller.del);

module.exports = { route }