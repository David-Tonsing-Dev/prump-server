const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 1,
    },
    joinDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("User", userSchema);
