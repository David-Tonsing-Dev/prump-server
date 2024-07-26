const mongoose = require("mongoose");

const dailyRewardSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    youtubeLink: {
      type: Boolean,
      default: false,
    },
    youTubeCoins: {
      type: Number,
      default: 100000,
    },
    DailyCoin: {
      type: Number,
    },
    twitterLink: {
      type: String,
    },
    twitterLinkCheck: {
      type: Boolean,
      default: false,
    },
    twitterId: {
      type: String,
    },
    twitterCoins: {
      type: Number,
      default: 10000,
    },
    telegramLink: {
      type: String,
    },
    telegramLinkCheck: {
      type: Boolean,
      default: false,
    },
    telegramCoins: {
      type: Number,
      default: 10000,
    },
    everyDataReward: [
      {
        day: {
          type: Number,
          default: 1,
        },
        rewardCoins: {
          type: Number,
          default: 500,
        },
        claim: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("DailyReward", dailyRewardSchema);
