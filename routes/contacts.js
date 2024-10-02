const express = require("express");
const contactsController = require("../controllers/contacts.js");
const router = express.Router();

//GET localhost:8080/contacts
router.get("/", contactsController.getContacts);

// GET localhost:8080/contacts/:id
router.get("/:id", contactsController.getContactById);

module.exports = router;
