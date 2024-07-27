const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { userId, userName } = req.body;

    if (!userId || !userName)
      return res
        .status(400)
        .json({ status: 400, message: "Need userId and userName!" });

    let checkUser = await User.findOne({ userId });

    if (!checkUser) {
      checkUser = new User({ userId, userName });
      await checkUser.save();
    }

    // if (checkUser) {
    //   return res.status(200).json({
    //     status: true,
    //     user: { userId, userName, coins: checkUser.coins },
    //     message: "Already exist!",
    //   });
    // }

    // const newUser = new User({ userId, userName });
    // await newUser.save();

    const token = jwt.sign(
      { chatId: checkUser.userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "6d" }
    );

    return res.status(200).json({
      status: true,
      token,
      user: { userId, userName, coins: checkUser.coins },
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
  registerUser,
};
