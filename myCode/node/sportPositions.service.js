const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const postSportPosition = (sportId, code, name, inactive) => {
  return mssql
    .executeProc("SportPosition_Insert", sqlRequest => {
      sqlRequest.addParameter("SportId", TYPES.NVarChar, sportId);
      sqlRequest.addParameter("Code", TYPES.NVarChar, code);
      sqlRequest.addParameter("Name", TYPES.NVarChar, name);
      sqlRequest.addParameter("Inactive", TYPES.NVarChar, inactive);
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      const item = {
        id: response.outputParameters.Id
      };
      return item;
    });
};

const getSportPositionById = id => {
  return mssql
    .executeProc("SportPosition_SelectBySportId", sqlRequest => {
      sqlRequest.addParameter("SportId", TYPES.Int, id);
    })
    .then(response => {
      return response;
    });
};

const getSportPositionBySportName = sportName => {
  return mssql
    .executeProc("SportPositionBySportName_Search", sqlRequest => {
      sqlRequest.addParameter("SportName", TYPES.NVarChar, sportName);
    })
    .then(response => {
      return response;
    });
};

const getAllSportPosition = () => {
  return mssql.executeProc("SportPosition_SelectAll", sqlRequest => {}).then(response => {
    return response;
  });
};

const putSportPosition = (id, sportId, code, name, inactive) => {
  return mssql
    .executeProc("SportPosition_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
      sqlRequest.addParameter("SportId", TYPES.NVarChar, sportId);
      sqlRequest.addParameter("Code", TYPES.NVarChar, code);
      sqlRequest.addParameter("Name", TYPES.NVarChar, name);
      sqlRequest.addParameter("Inactive", TYPES.NVarChar, inactive);
    })
    .then(response => {
      return response;
    });
};

const deleteSportPosition = req => {
  return mssql
    .executeProc("SportPosition_Delete", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, req.params.id);
    })
    .then(response => {
      return response;
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
