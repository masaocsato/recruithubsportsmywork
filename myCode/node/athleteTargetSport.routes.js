const athleteTargetSportController = require("../controllers/athleteTargetSport.controller");
const router = require("express").Router();

module.exports = router;

router.post("/", athleteTargetSportController.post);
router.get("/:id(\\d+)", athleteTargetSportController.getById);
router.put("/", athleteTargetSportController.putById);
router.delete("/:id(\\d+)", athleteTargetSportController.deleteById);
