const iconService = require("../services/icon.service");
const responses = require("../models/responses");

module.exports = {
  getAll: (req, res) => {
    iconService
      .getAll()
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
