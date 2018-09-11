const athleteLinksController = require("../controllers/athleteLinks.controller");
const router = require("express").Router();

module.exports = router;

router.post("/:id(\\d+)", athleteLinksController.post);
router.get("/", athleteLinksController.getAll);
router.get("/:id(\\d+)", athleteLinksController.getById);
router.delete("/:id(\\d+)", athleteLinksController.deleteLink);
