const express = require("express");
const app = express();
const cors = require("cors");
const mongoDB = require("./database/connect");
const professionalRoutes = require("./routes/professional");
const contactRoutes = require("./routes/contacts");
const myRoutes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Middleware to parse JSON request body
app
  .use(express.json())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use("/professional", professionalRoutes)
  .use("/contacts", contactRoutes)
  .use("/", myRoutes);

// Connect to MongoDB
mongoDB.connectDb();

// Start server on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
