const express = require("express");

const router = express.Router();

const autorController = require("../controllers/autorController");

router.post("/login", autorController.login);

module.exports = router;