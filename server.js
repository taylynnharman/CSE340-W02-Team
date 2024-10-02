const express = require("express");
const app = express();
const cors = require("cors");
const dataRoutes = require("./routes/professional");

app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Define route for data
app.use("/professional", dataRoutes);

// Start server on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
