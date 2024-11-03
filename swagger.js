const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "Contact Management API",
  },
  // Use the host environment variable or default to localhost for development
  host:
    process.env.NODE_ENV === "production"
      ? "cse341-8zfd.onrender.com"
      : "localhost:8080",

  // Adjust scheme based on environment
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
