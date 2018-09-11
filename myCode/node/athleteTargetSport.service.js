const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const post = (userId, sportId, sportPositionIdJson, preferenceOrder) => {
  return mssql
    .executeProc("AthleteTargetSport_Insert", request => {
      request.addParameter("UserId", TYPES.Int, userId);
      request.addParameter("SportId", TYPES.Int, sportId);
      request.addParameter("SportPositionIdJson", TYPES.NVarChar, sportPositionIdJson);
      request.addParameter("PreferenceOrder", TYPES.Int, preferenceOrder);
      request.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      const item = {
        id: response.outputParameters.Id
      };
      return item;
    })
    .catch(err => {
      return err;
    });
};

const getById = id => {
  return mssql
    .executeProc("AthleteTargetSport_SelectById", request => {
      request.addParameter("UserId", TYPES.Int, id);
    })
    .then(response => {
      const item = {
        athleteTargetInfo: response.resultSets[0]
      };
      for (let i = 0; i < item.athleteTargetInfo.length; i++) {
        let newItem;
        newItem = item.athleteTargetInfo[i].SportPositionInfo;
        newItem = JSON.parse(newItem);
        item.athleteTargetInfo[i].SportPositionInfo = newItem;
      }

      return item;
    })
    .catch(err => {
      return err;
    });
};

const putById = (id, sportId, sportPositionIdJson) => {
  return mssql
    .executeProc("AthleteTargetSport_Update", request => {
      request.addParameter("Id", TYPES.Int, id);
      request.addParameter("SportId", TYPES.Int, sportId);
      request.addParameter("SportPositionIdJson", TYPES.NVarChar, sportPositionIdJson);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

const deleteById = id => {
  return mssql
    .executeProc("AthleteTargetSport_Delete", request => {
      request.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  post,
  getById,
  putById,
  deleteById
};
