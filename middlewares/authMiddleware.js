const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token)
      return res
        .status(400)
        .json({ status: false, message: "Access token not found!" });

    token = token.split(" ")[1];

    let user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.chatId = user.chatId;
    next();
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Interval server error!",
      error: err.message,
    });
  }
};

module.exports = authMiddleware;
