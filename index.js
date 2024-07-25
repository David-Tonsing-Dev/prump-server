require("dotenv").config();
require("./dbConfig/config");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 8001;

const userRoutes = require("./routes/userRoutes");
const rewardRoutes = require("./routes/rewardRoutes");
const pointRoutes = require("./routes/pointRoutes");
const User = require("./models/userModel");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/reward", rewardRoutes);
app.use("/api/points", pointRoutes);

app.get("/test", (req, res) => {
  return res.json("This is testing!!!");
});

let client = [];

wss.on("connection", async (ws) => {
  client.push(ws);
  client = client.filter((user) => user !== ws);

  const getAllUser = await User.find().sort({ coins: -1 });

  if (getAllUser) {
    ws.send(JSON.stringify({ type: "list", list: getAllUser }));
  }

  ws.on("message", async (message) => {
    const { type, userId, coins } = JSON.parse(message);
    const coin = parseInt(coins);

    const checkUser = await User.findOneAndUpdate(
      { userId },
      { $inc: { coins: coin } },
      { new: true }
    );

    const getAllUser = await User.find().sort({ coins: -1 });

    if (getAllUser) {
      ws.send(JSON.stringify({ type: "list", list: getAllUser }));
    }

    if (!checkUser) return console.log("Error occured");
  });
});

server.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
