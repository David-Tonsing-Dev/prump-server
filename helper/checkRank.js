const ranks = require("../constant/rank");

const checkRank = (data) => {
  let rangeRank = {
    rank: data.rank,
    update: false,
  };
  ranks.forEach((item) => {
    if (item.min <= data.coins && data.coins <= item.max) {
      rangeRank.rank = item.id;
    }
  });

  if (rangeRank.rank > data.rank) {
    rangeRank.update = true;
  }

  return rangeRank;
};

module.exports = checkRank;
