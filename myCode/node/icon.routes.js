const iconController = require("../controllers/icon.controller");
const router = require("express").Router();

module.exports = router;

router.get("/", iconController.getAll);
