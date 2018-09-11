const sportPositions = require("../services/sportPositions.service");

const responses = require("../models/responses/index");

const postSportPosition = (req, res) => {
  const { sportId, code, name, inactive } = req.body;
  sportPositions
    .postSportPosition(sportId, code, name, inactive)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
    });
};

const getAllSportPosition = (req, res) => {
  sportPositions.getAllSportPosition().then(item => {
    const r = new responses.ItemsResponse(item);
    res.json(r);
  });
};

const getSportPositionById = (req, res) => {
  sportPositions.getSportPositionById(req.params.id).then(item => {
    const r = new responses.ItemsResponse(item);
    res.json(r);
  });
};

const getSportPositionBySportName = (req, res) => {
  sportPositions.getSportPositionBySportName(req.params.sportName).then(item => {
    const r = new responses.ItemsResponse(item);
    res.json(r);
  });
};

const putSportPosition = (req, res) => {
  const { id, sportId, code, name, inactive } = req.body;
  sportPositions.putSportPosition(id, sportId, code, name, inactive).then(response => {
    res.sendStatus(200);
  });
};

const deleteSportPosition = (req, res) => {
  sportPositions.deleteSportPosition(req).then(() => {
    res.sendStatus(200);
  });
};

module.exports = {
  postSportPosition,
  getAllSportPosition,
  getSportPositionById,
  getSportPositionBySportName,
  putSportPosition,
  deleteSportPosition
};
