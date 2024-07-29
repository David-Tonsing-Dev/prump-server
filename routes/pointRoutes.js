const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getPoints } = require("../controllers/pointControllers");

router.get("/rank/:rankId", authMiddleware, getPoints);

module.exports = router;
