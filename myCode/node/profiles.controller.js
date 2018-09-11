const profilesService = require("../services/profiles.service");

const getById = (req, res) => {
  profilesService
    .getById(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(404).send(err);
      console.log(err);
    });
};

const getPicById = (req, res) => {
  profilesService
    .getPicById(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getEvents = (req, res) => {
  profilesService
    .getEvents(req.params.userId)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const getAttendingByUserId = (req, res) => {
  profilesService
    .getAttendingByUserId(req.params.userId)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  profilesService
    .put(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

module.exports = {
  getById,
  getPicById,
  getEvents,
  getAttendingByUserId,
  put
};
