const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  subscribeTelegram,
  checkXUser,
  checkXSubscribe,
  getAllRewardDetail,
  getDailyReward,
  checkyoutubeWatch,
  claimYoutubeWatch,
} = require("../controllers/rewardController");

router.post("/subcribe/telegram", authMiddleware, subscribeTelegram);
router.post("/check/twitter", authMiddleware, checkXUser);
router.get("/check/subscribe/twitter", authMiddleware, checkXSubscribe);
router.get("/get/detail", authMiddleware, getAllRewardDetail);
router.get("/daily/:day", authMiddleware, getDailyReward);
router.patch("/youtube/:id", authMiddleware, checkyoutubeWatch);
router.patch("/youtube/claim/:id", authMiddleware, claimYoutubeWatch);

module.exports = router;
