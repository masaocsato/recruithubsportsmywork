const router = require("express").Router();
const highlightListController = require("../controllers/highlightList.controller");

module.exports = router;

router.get("/:userId(\\d+)", highlightListController.getById);
