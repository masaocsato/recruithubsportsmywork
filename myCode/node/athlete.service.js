const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("Athlete_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      const item = {
        athletes: response.resultSets[0]
      };
      return item;
    });
};

const putById = (body, Id) => {
  return mssql
    .executeProc("Athlete_Update", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, body.id);
      sqlRequest.addParameter("UserId", TYPES.Int, Id);
      sqlRequest.addParameter("FirstName", TYPES.NVarChar, body.firstName);
      sqlRequest.addParameter("MiddleName", TYPES.NVarChar, body.middleName);
      sqlRequest.addParameter("LastName", TYPES.NVarChar, body.lastName);
      sqlRequest.addParameter("SchoolId", TYPES.Int, body.schoolId);
      sqlRequest.addParameter("ClassYearId", TYPES.Int, body.classYearId);
      sqlRequest.addParameter("HighSchoolGraduationYear", TYPES.Int, body.highSchoolGraduationYear);
      sqlRequest.addParameter("City", TYPES.NVarChar, body.city);
      sqlRequest.addParameter("State", TYPES.NVarChar, body.state);
      sqlRequest.addParameter("Height", TYPES.Int, body.height);
      sqlRequest.addParameter("Weight", TYPES.Int, body.weight);
      sqlRequest.addParameter("SAT", TYPES.Int, body.sat);
      sqlRequest.addParameter("ACT", TYPES.Int, body.act);
      sqlRequest.addParameter("GPA", TYPES.Decimal, body.gpa);
      sqlRequest.addParameter("AcademicNotes", TYPES.NVarChar, body.academicNotes);
      sqlRequest.addParameter("ShortBio", TYPES.NVarChar, body.shortBio);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getById,
  putById
};
