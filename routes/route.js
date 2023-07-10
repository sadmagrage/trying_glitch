const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");

const controller = require("../controllers/controller");
const middleware = require("../middlewares/basicAuth");

router.use(bodyparser.json());

router.get("/", controller.get);

router.post("/", middleware.auth, controller.post);

module.exports = { router };