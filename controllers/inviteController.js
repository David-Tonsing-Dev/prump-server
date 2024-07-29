const Invite = require("../models/inviteModels");
const User = require("../models/userModel");
const generateUniqueCode = require("../constant/uniqueCode");

const generateLink = async (req, res) => {
  try {
    const chatId = req.chatId;

    let checkInviteLink = await Invite.findOne({ chatId });

    let channelId = "axogame_bot";

    if (checkInviteLink)
      return res.status(200).json({
        status: true,
        referrelLink: `https://t.me/${channelId}?startup=${checkInviteLink.referralCode}`,
      });

    const referralCode = generateUniqueCode(chatId);

    checkInviteLink = new Invite({
      chatId,
      referralCode,
    });

    await checkInviteLink.save();

    return res.status(200).json({
      status: true,
      referrelLink: `https://t.me/${channelId}?startup=${checkInviteLink.referralCode}`,
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
    const chatId = referralCode.split("_")[1];

    const checkInvite = await Invite.findOne({
      referralCode: referralCode,
      redeemedBy: {
        $elemMatch: { chatId: userId },
      },
    });

    if (checkInvite)
      return res
        .status(200)
        .json({ status: false, message: "Already redeemed reward!" });

    const newEntry = {
      chatId: userId,
      rewarded: true,
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

    const incrementCoins = newEntry.coinRewarded;

    const updateCoin = await User.findOneAndUpdate(
      { userId: chatId },
      { $inc: { coins: incrementCoins } },
      { new: true }
    );

    if (!updateCoin)
      return res.status(400).json({
        status: false,
        message: "Something went wrong in updating referral coins!",
      });

    return res
      .status(200)
      .json({ status: true, message: "Referred link reward", updateCoin });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

module.exports = {
  generateLink,
  trackReferral,
};
