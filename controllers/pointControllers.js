const User = require("../models/userModel");
const rank = require("../constant/rank");

const getPoints = async (req, res) => {
  try {
    const { rankId } = req.params;

    const choosenRank = rank.filter((item) => item.id === rankId);

    if (!rankId || rankId === "undefined")
      return res
        .status(400)
        .json({ status: 400, message: "Cannot found rank category!" });

    const getTopRank = await User.find({
      coins: { $lte: choosenRank[0].max, $gte: choosenRank[0].min },
    })
      .sort({ coins: -1 })
      .limit(100);

    if (getTopRank.length <= 0)
      return res.status(400).json({ status: false, message: "No data found!" });

    return res.status(200).json({
      status: true,
      rankList: getTopRank,
      rankCategory: choosenRank[0].rank,
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
  getPoints,
};
