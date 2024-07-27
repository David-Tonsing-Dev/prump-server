const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  subscribeTelegram,
  checkXUser,
  checkXSubscribe,
  getAllRewardDetail,
} = require("../controllers/rewardController");

router.post("/subcribe/telegram", authMiddleware, subscribeTelegram);
router.post("/check/twitter", authMiddleware, checkXUser);
router.get("/check/subscribe/twitter", authMiddleware, checkXSubscribe);
router.get("/get/detail", authMiddleware, getAllRewardDetail);

module.exports = router;
