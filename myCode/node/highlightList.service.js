const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = userId => {
  return mssql
    .executeProc("HighlightList_SelectById", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getById
};
