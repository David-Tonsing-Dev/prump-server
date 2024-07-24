const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    console.log("=====1");
    const { userId, userName } = req.body;
    console.log("userId, userName", userId, userName);

    if (!userId || !userName)
      return res
        .status(400)
        .json({ status: 400, message: "Need userId and userName!" });

    const checkUser = await User.findOne({ userId });

    if (checkUser) {
      return res.status(200).json({
        status: true,
        user: { userId, userName, coins: checkUser.coins },
        message: "Already exist!",
      });
    }

    const newUser = new User({ userId, userName });
    await newUser.save();

    return res
      .status(200)
      .json({ status: true, user: { userId, userName, coins: newUser.coins } });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error!",
      error: err.message,
    });
  }
};

module.exports = {
  registerUser,
};
