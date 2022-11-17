const ogs = require("open-graph-scraper");

const getOg = async (url) => {
  let res;
  await ogs({ url }).then((data) => {
    const { error, result, response } = data;
    res = result;
  });
  return res;
};

module.exports.getOg = getOg;
