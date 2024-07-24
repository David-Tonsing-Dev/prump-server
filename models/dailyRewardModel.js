const mongoose = require("mongoose");

const dailyRewardSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    youtubeLink: {
      type: String,
    },
    youtubeLink: {
      type: Boolean,
      default: false,
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
    telegramLink: {
      type: String,
    },
    telegramLinkCheck: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("DailyReward", dailyRewardSchema);
