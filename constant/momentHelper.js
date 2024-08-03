const moment = require("moment");

const isBetween = (startDate, toCheckDate, endDate) => {
  const toCheckCurrentDate = moment(toCheckDate);
  const compareStartDate = moment(startDate);
  const commpareEndDate = moment(endDate);

  const isBetween = toCheckCurrentDate.isBetween(
    compareStartDate,
    commpareEndDate,
    null,
    "[]"
  );

  return isBetween;
};

const findDay = (startDate, endDate) => {
  const date1 = moment(startDate);
  const date2 = moment(endDate);

  return date2.diff(date1, "days");
};

module.exports = {
  isBetween,
  findDay,
};
