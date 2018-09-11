const followerService = require("../services/follower.service");
const responses = require("../models/responses/index");

const getById = (req, res) => {
  followerService
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
