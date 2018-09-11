const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;

const getById = id => {
  return mssql
    .executeProc("Profile_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    });
};

const getPicById = id => {
  return mssql
    .executeProc("User_SelectAvatarById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      return response;
    });
};

const getEvents = userId => {
  return mssql
    .executeProc("EventUser_SelectEventsByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(response => {
      return response;
    });
};

const getAttendingByUserId = userId => {
  return mssql
    .executeProc("EventUser_SelectEventsByUserId", sqlRequest => {
      sqlRequest.addParameter("UserId", TYPES.Int, userId);
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
};

const put = body => {
  return mssql
    .executeProc("User_UpdateAvatar", sqlRequest => {
      sqlRequest.addParameter("AvatarUrl", TYPES.NVarChar, body.avatarUrl, { length: 250 });
      sqlRequest.addParameter("Id", TYPES.Int, body.id);
    })
    .then(response => {
      return response;
    });
};

module.exports = {
  getById,
  getPicById,
  getEvents,
  getAttendingByUserId,
  put
};
