const express = require("express");
const router = express.Router();

const { getPoints } = require("../controllers/pointControllers");

router.get("/rank/:rankId", getPoints);

module.exports = router;
