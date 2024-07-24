const Reward = require("../models/dailyRewardModel");

const subscribeTelegram = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { telegramConfirm } = req.body;

    if (!chatId || chatId === "undefined")
      return res
        .status(400)
        .json({ status: false, message: "Undefined chatId!" });

    const checkReward = await Reward.findOneAndUpdate(
      { chatId },
      { telegramLinkCheck: telegramConfirm },
      { new: true }
    );

    if (checkReward) {
      return res
        .status(200)
        .json({ status: 200, message: "Updated reward already exist" });
    }

    const updateReward = new Reward({
      chatId,
      telegramLinkCheck: telegramConfirm,
    });

    await updateReward.save();

    return res.status(200).json({ status: 200, message: "Updated reward!" });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

module.exports = {
  subscribeTelegram,
};
