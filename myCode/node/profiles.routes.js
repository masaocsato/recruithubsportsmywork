const router = require("express").Router();
const profilesController = require("../controllers/profiles.controller");

module.exports = router;

router.get("/", profilesController.getById);

router.get("/pic/:id", profilesController.getPicById);

router.get("/events/:userId", profilesController.getEvents);

router.get("/events/attending/:userId", profilesController.getAttendingByUserId);

router.put("/:id", profilesController.put);
