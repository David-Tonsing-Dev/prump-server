const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  generateLink,
  trackReferral,
  inviteFriendClaim,
} = require("../controllers/inviteController");

router.get("/generate-link", authMiddleware, generateLink);
router.post("/track-referral", trackReferral);
router.get("/friend/claim", authMiddleware, inviteFriendClaim);

module.exports = router;
