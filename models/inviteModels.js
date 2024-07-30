const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
    },
    redeemedBy: [
      {
        chatId: {
          type: String,
          default: null,
        },
        rewarded: {
          type: Boolean,
          default: false,
        },
        coinRewarded: {
          type: Number,
          default: 25000,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Invite", inviteSchema);
