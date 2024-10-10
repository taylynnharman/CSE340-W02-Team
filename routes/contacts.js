const express = require("express");
const contactsController = require("../controllers/contacts.js");
const router = express.Router();

//GET localhost:8080/contacts
router.get("/", contactsController.getContacts);

// GET localhost:8080/contacts/:id
router.get("/:id", contactsController.getContactById);

//Route to create a new contact. All fields required. Return new contact id in response body
router.post("/", contactsController.createContact);

//Update contact. This route should allow for a url similar to this: api-url-path/contacts/id-to-modify. (The id won't be modified, it will just be the means of finding a specific document in the database.) Return an http status code representing the successful completion of the request.
router.put("/:id", contactsController.updateContact);

//Delete Contact. Return https status code showing deletion as successful
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
