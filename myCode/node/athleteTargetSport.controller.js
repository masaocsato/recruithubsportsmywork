const athleteTargetSportService = require("../services/athleteTargetSport.service");
const responses = require("../models/responses");

module.exports = {
  post: (req, res) => {
    const { userId, sportId, sportPositionIdJson, preferenceOrder } = req.body;
    athleteTargetSportService
      .post(userId, sportId, sportPositionIdJson, preferenceOrder)
      .then(Id => {
        res.status(201).json(Id);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getById: (req, res) => {
    athleteTargetSportService
      .getById(req.params.id)
      .then(item => {
        res.json(new responses.ItemResponse(item));
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  putById: (req, res) => {
    const { id, sportId, sportPositionIdJson } = req.body;
    athleteTargetSportService
      .putById(id, sportId, sportPositionIdJson)
      .then(response => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  deleteById: (req, res) => {
    const { id } = req.params;
    athleteTargetSportService
      .deleteById(id)
      .then(response => {
        console.log(response);
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
