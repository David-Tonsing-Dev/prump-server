const mongoose = require("mongoose");

// const dailyRewardSchema = mongoose.Schema(
//   {
//     chatId: {
//       type: String,
//     },
//     youtubeLink: {
//       type: String,
//     },
//     youtubeLink: {
//       type: Boolean,
//       default: false,
//     },
//     youTubeCoins: {
//       type: Number,
//       default: 100000,
//     },
//     DailyCoin: {
//       type: Number,
//     },
//     twitterLink: {
//       type: String,
//     },
//     twitterLinkCheck: {
//       type: Boolean,
//       default: false,
//     },
//     twitterId: {
//       type: String,
//     },
//     twitterCoins: {
//       type: Number,
//       default: 10000,
//     },
//     telegramLink: {
//       type: String,
//     },
//     telegramLinkCheck: {
//       type: Boolean,
//       default: false,
//     },
//     telegramCoins: {
//       type: Number,
//       default: 10000,
//     },
//     everyDataReward: [
//       {
//         day: {
//           type: Number,
//           default: 1,
//         },
//         rewardCoins: {
//           type: Number,
//           default: 500,
//         },
//         claim: {
//           type: Boolean,
//           default: false,
//         },
//       },
//     ],
//     inviteFriend: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const youtubeSchema = [
  {
    link: {
      type: String,
    },
    reward: {
      type: Number,
      default: 100000,
    },
    redeemedTime: {
      type: String,
    },
    redeem: {
      type: Boolean,
      default: false,
    },
  },
];

const everyDayRewardSchema = [
  {
    day: {
      type: String,
    },
    reward: {
      type: Number,
    },
    redeemedTime: {
      type: String,
    },
    redeem: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
];

const telegramSchema = {
  link: {
    type: String,
  },
  reward: {
    type: Number,
    default: 10000,
  },
  redeemedTime: {
    type: String,
  },
  redeem: {
    type: Boolean,
    default: false,
  },
};

const twitterSchema = {
  link: {
    type: String,
  },
  twitterId: {
    type: String,
  },
  reward: {
    type: Number,
    default: 10000,
  },
  redeemedTime: {
    type: String,
  },
  redeem: {
    type: Boolean,
    default: false,
  },
};

const inviteFriendSchema = {
  requireFriend: {
    type: Number,
    default: 3,
  },
  reward: {
    type: Number,
    default: 25000,
  },
  redeem: {
    type: Boolean,
    default: false,
  },
  redeemedTime: {
    type: String,
  },
};

const dailyRewardSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    youtube: youtubeSchema,
    everyDayReward: everyDayRewardSchema,
    telegram: telegramSchema,
    twitter: twitterSchema,
    inviteFriend: inviteFriendSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("DailyReward", dailyRewardSchema);
