const axios = require("axios");
const Reward = require("../models/dailyRewardModel");
const User = require("../models/userModel");

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

const checkXUser = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userName } = req.body;

    const response = await axios.post(
      "https://twitter154.p.rapidapi.com/user/details",
      {
        username: userName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    const resData = await response.data;

    if (!resData.user_id)
      return res.status(401).json({
        status: false,
        message: `Twitter user with username=${userName} not found`,
      });

    const newTwitterUser = await Reward.findOneAndUpdate(
      { chatId },
      { twitterId: resData.user_id },
      { new: true }
    );

    if (!newTwitterUser) {
      const newTwitterUser = new Reward({
        chatId,
        twitterId: resData.user_id,
      });

      await newTwitterUser.save();
    }

    return res
      .status(200)
      .json({ status: true, message: "Twitter user register!" });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const checkXSubscribe = async (req, res) => {
  const { chatId } = req.params;

  try {
    if (!chatId || chatId === "undefined")
      return res
        .status(400)
        .json({ status: false, message: "Could not found user!" });

    const checkChatId = await Reward.findOne({ chatId });

    if (!checkChatId)
      return res
        .status(400)
        .json({ status: false, message: "Could not found user!" });

    const response = await axios.get(
      `https://twitter154.p.rapidapi.com/user/followers?user_id=${process.env.TWITTER_USER_ID}`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.RAPIDAPI_HOST,
          "Content-Type": "application/json",
        },
      }
    );

    const followerList = response.data.results;

    const checkUserFollow = followerList.some(
      (item) => item.user_id === checkChatId.twitterId
    );

    if (!checkUserFollow)
      return res.status(200).json({
        status: true,
        message: "Task not complete!",
        xIsSubscribe: checkChatId.twitterLinkCheck,
      });

    const updateUser = await User.findOneAndUpdate(
      { userId: chatId },
      { $inc: { coins: checkChatId.twitterCoins } },
      { new: true }
    );

    if (!updateUser)
      return res
        .status(400)
        .json({ status: false, message: "Could not update reward!" });

    const updatedReward = await Reward.findOneAndUpdate(
      { chatId },
      { twitterLinkCheck: true },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Task completed!",
      xIsSubscribe: updatedReward.twitterLinkCheck,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

const getAllRewardDetail = async (req, res) => {
  try {
    const { coinId } = req.params;

    const getReward = await Reward.findOne({ chatId: coinId });

    if (!getReward)
      return res
        .status(400)
        .json({ status: false, message: "User not found!" });

    return res.status(200).json({ status: true, rewardDetail: getReward });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  subscribeTelegram,
  checkXUser,
  checkXSubscribe,
  getAllRewardDetail,
};
