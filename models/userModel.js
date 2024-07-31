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
    joinDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("User", userSchema);
