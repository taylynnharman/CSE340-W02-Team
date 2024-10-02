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

module.exports = { getContacts, getContactById };
