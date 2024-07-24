const express = require("express");
const router = express.Router();

const { subscribeTelegram } = require("../controllers/rewardController");

router.post("/subcribe/telegram/:chatId", subscribeTelegram);

module.exports = router;
