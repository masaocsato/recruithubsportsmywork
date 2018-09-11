const router = require("express").Router();
const athleteController = require("../controllers/athlete.controller");

module.exports = router;

router.get("/:id(\\d+)", athleteController.getById);
router.put("/:id(\\d+)", athleteController.putById);
