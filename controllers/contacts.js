const { getDb } = require("../database/connect");

const getContacts = async (req, res) => {
  try {
    const db = getDb();
    const contactsCollection = db.collection("contacts");

    // Fetch all contacts from the collection
    const contacts = await contactsCollection.find({}).toArray();

    // Respond with the fetched contacts
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
};

const { ObjectId } = require("mongodb"); // Import ObjectId from mongodb

// Function to get a single contact by ID
const getContactById = async (req, res) => {
  const contactId = req.params.id; // Get ID from the URL parameters

  // Check if the contactId is a valid ObjectId
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ error: "Invalid contact ID" }); // Return 400 for invalid ID format
  }

  try {
    const db = getDb();
    const contactsCollection = db.collection("contacts");

    // Attempt to find the contact by ID
    const contact = await contactsCollection.findOne({
      _id: new ObjectId(contactId),
    });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" }); // Return 404 if not found
    }

    res.status(200).json(contact); // Return the found contact
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" }); // Return a 500 error
  }
};
/* CREATE CONTACT */
const createContact = async (req, res) => {
  console.log("req body", req.body);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  console.log("Contact", contact);
  try {
    const db = getDb();
    const response = await db.collection("contacts").insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ contactId: response.insertedId });
    } else {
      res.status(500).json({ error: "Failed to create the contact." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

/* UPDATE CONTACT */
const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };

  try {
    const db = getDb();
    const response = await db
      .collection("contacts")
      .updateOne({ _id: contactId }, { $set: updatedContact });
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "Contact updated successfully." });
    } else {
      res.status(404).json({ error: "No contact found with that ID." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

/* DELETE CONTACT */
const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  try {
    const db = getDb();
    const response = await db
      .collection("contacts")
      .deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: "Contact deleted successfully." });
    } else {
      res.status(404).json({ error: "No contact found with that ID." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred: " + error.message });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};

/*
You should test each of these routes thoroughly using your rest client of choice (this REST Client works well) .
Ensure you include a .rest file for testing (similar to what you see in the example video - shown in sample solution below).
Push to GitHub.
Publish to Render.
Create a brief video demonstrating the functionality of your assignment. Upload it to YouTube (public or unlisted).
Be sure to review the rubric below to see how you will be graded on this assignment.*/
