const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getAll = () => {
  return mssql
    .executeProc("Icon_SelectAll")
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getAll
};
