const highlightListService = require("../services/highlightList.service");
const responses = require("../models/responses/index");

const getById = (req, res) => {
  highlightListService
    .getById(req.params.userId)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  getById
};
