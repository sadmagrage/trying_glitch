const path = require("path");
const express = require("express");
const { Router } = require("express");

const route = express.Router();

route.use(express.static('public'));

route.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = { route };