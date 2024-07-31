const Invite = require("../models/inviteModels");
const User = require("../models/userModel");
const Reward = require("../models/dailyRewardModel");
const dailyReward = require("../constant/dailyReward");
const generateUniqueCode = require("../constant/uniqueCode");

const generateLink = async (req, res) => {
  try {
    const chatId = req.chatId;

    let checkInviteLink = await Invite.findOne({ chatId });

    // let channelId = "beast_combatBot";
    let channelId = "axogame_bot";

    if (checkInviteLink)
      return res.status(200).json({
        status: true,
        referrelLink: `https://t.me/${channelId}?start=${checkInviteLink.referralCode}`,
      });

    const referralCode = generateUniqueCode(chatId);

    checkInviteLink = new Invite({
      chatId,
      referralCode,
    });

    await checkInviteLink.save();

    return res.status(200).json({
      status: true,
      referrelLink: `https://t.me/${channelId}?start=${checkInviteLink.referralCode}`,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

const trackReferral = async (req, res) => {
  try {
    const { userId, referralCode } = req.body;

    const checkInvite = await Invite.findOne({
      referralCode: referralCode,
      redeemedBy: {
        $elemMatch: { chatId: userId },
      },
    });

    if (checkInvite) {
      if (checkInvite.redeemedBy.rewarded)
        return res
          .status(200)
          .json({ status: false, message: "Already redeemed reward!" });

      if (!checkInvite.redeemedBy.rewarded) {
        return res.status(200).json({
          status: false,
          message: `Already referred from ${referralCode}!`,
        });
      }
    }

    const newEntry = {
      chatId: userId,
      rewarded: false,
      coinRewarded: 25000,
    };

    const updateInvite = await Invite.updateOne(
      {
        referralCode,
      },
      {
        $push: { redeemedBy: newEntry },
      },
      { new: true }
    );
    if (!updateInvite)
      return res
        .status(400)
        .json({ status: false, message: "Something went wrong in updating!" });

    return res.status(200).json({
      status: true,
      message: "Referred user added!",
      updateInvite,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

const inviteFriendClaim = async (req, res) => {
  try {
    const chatId = req.chatId;

    const checkInviteRedeemed = await Reward.findOne({
      chatId,
    });

    if (!checkInviteRedeemed) {
      const newReward = new Reward({ chatId });
      await newReward.save();
    }

    if (checkInviteRedeemed.inviteFriend.redeem)
      return res
        .status(200)
        .json({ status: false, message: "Already redeemed!" });

    const checkInvite = await Invite.findOne({ chatId });

    const checkInviteJoin = checkInvite.redeemedBy.filter(
      (item) => item.rewarded
    );

    if (checkInviteJoin.length < 3)
      return res
        .status(200)
        .json({ status: false, message: "Task not completed!" });

    const updatedReward = await Reward.findOneAndUpdate(
      { chatId },
      { $set: { "inviteFriend.redeem": true } }
    );

    await User.findOneAndUpdate(
      { userId: chatId },
      { $inc: { coins: updatedReward.inviteFriend.reward } }
    );

    return res.status(200).json({ status: true, message: "Task completed" });
  } catch (err) {}
};

module.exports = {
  generateLink,
  trackReferral,
  inviteFriendClaim,
};
