const router = require("express").Router();
const followerController = require("../controllers/follower.controller");

module.exports = router;

router.get("/follows/:userId(\\d+)", followerController.getById);
