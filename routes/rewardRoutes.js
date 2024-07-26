const express = require("express");
const router = express.Router();

const {
  subscribeTelegram,
  checkXUser,
  checkXSubscribe,
  getAllRewardDetail,
} = require("../controllers/rewardController");

router.post("/subcribe/telegram/:chatId", subscribeTelegram);
router.post("/check/twitter/:chatId", checkXUser);
router.get("/check/subscribe/twitter/:chatId", checkXSubscribe);
router.get("/get/detail/:coinId", getAllRewardDetail);

module.exports = router;
