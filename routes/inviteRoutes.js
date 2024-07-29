const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  generateLink,
  trackReferral,
} = require("../controllers/inviteController");

router.get("/generate-link", authMiddleware, generateLink);
router.post("/track-referral", trackReferral);

module.exports = router;
