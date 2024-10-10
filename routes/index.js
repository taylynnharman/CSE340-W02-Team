const express = require("express");
const myController = require("../controllers/myController.js");
const router = express.Router();

//Display Names Activity
router.get("/", myController.displayNameFunction);
router.get("/another", myController.displayAnotherNameFunction);

module.exports = router;
