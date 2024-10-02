const fs = require("fs");
const path = require("path");

const getData = (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, "../data.json");
    const jsonData = fs.readFileSync(dataPath, "utf-8");
    const result = JSON.parse(jsonData);

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve data from JSON file" });
  }
};

const getMongoData = (req, res, next) => {};

module.exports = { getData, getMongoData };
