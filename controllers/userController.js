const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Invite = require("../models/inviteModels");
const Reward = require("../models/dailyRewardModel");

const dailyReward = require("../constant/dailyReward");

const registerUser = async (req, res) => {
  try {
    const { userId, userName, referralCode } = req.body;

    if (!userId || !userName)
      return res
        .status(400)
        .json({ status: 400, message: "Need userId and userName!" });

    let checkUser = await User.findOne({ userId });

    if (!checkUser) {
      checkUser = new User({ userId, userName, joinDate: new Date() });
      await checkUser.save();

      const addReward = new Reward({
        chatId: userId,
        youtube: dailyReward.youtube,
        telegram: dailyReward.telegram,
        twitter: dailyReward.twitter,
        everyDayReward: dailyReward.everyDayReward,
      });
      await addReward.save();

      if (referralCode || referralCode !== "") {
        const referralChatId = referralCode.split("_")[1];
        let checkInvite = await Invite.find({
          redeemedBy: {
            $elemMatch: { chatId: userId },
          },
        });

        const isRedeemed = checkInvite[0].redeemedBy.some(
          (item) => item.chatId === userId && item.rewarded
        );

        if (!isRedeemed) {
          const updateInvitee = await Invite.findOneAndUpdate(
            {
              chatId: referralChatId,
              referralCode,
              "redeemedBy.chatId": userId,
            },
            {
              $set: { "redeemedBy.$.rewarded": true },
            },
            { new: true }
          );

          checkUser = await User.findOneAndUpdate(
            { userId },
            { $inc: { coins: 5000 } },
            { new: true }
          );

          const updateCoin = await User.findOneAndUpdate(
            { userId: referralChatId },
            { $inc: { coins: 25000 } },
            { new: true }
          );

          if (!updateCoin)
            return res.status(400).json({
              status: false,
              message: "Something went wrong in updating referral coins!",
            });
        }
      }
    }

    const token = jwt.sign(
      { chatId: checkUser.userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "6d" }
    );

    return res.status(200).json({
      status: true,
      token,
      user: { userId, userName, coins: checkUser.coins },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

module.exports = {
  registerUser,
};
