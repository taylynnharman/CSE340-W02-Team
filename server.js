const express = require("express");
const app = express();
const cors = require("cors");
const mongoDB = require("./database/connect");
const professionalRoutes = require("./routes/professional");
const contactRoutes = require("./routes/contacts");

app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Connect to MongoDB
mongoDB.connectDb();

// Define route for data
app.use("/professional", professionalRoutes);
app.use("/contacts", contactRoutes);

// Start server on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
