const cron = require("node-cron");
const { checkDailyClaim } = require("../controllers/rewardController");

const dailyClaimTask = cron.schedule("0 0 * * * *", () => {
  console.log("running a task every minute");
  checkDailyClaim();
});

module.exports = {
  dailyClaimTask,
};
