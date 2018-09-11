const router = require("express").Router();
const sportsPositionsController = require("../controllers/sportPositions.controller");

module.exports = router;

router.post("/", sportsPositionsController.postSportPosition);
router.get("/", sportsPositionsController.getAllSportPosition);
// router.get("/sportposition/:id", sportsPositionsController.getSportPositionById);
router.get("/:sportName", sportsPositionsController.getSportPositionBySportName);
router.put("/", sportsPositionsController.putSportPosition);
router.delete("/:id", sportsPositionsController.deleteSportPosition);
