const displayNameFunction = (req, res, next) => {
  res.json("Lydia");
};

const displayAnotherNameFunction = (req, res, next) => {
  res.json("Chris");
};

module.exports = { displayNameFunction, displayAnotherNameFunction };
