const ogs = require("open-graph-scraper");

const getOg = async (url) => {
  let res;
  console.log(ogs);
  console.log(url);
  await ogs({ url })
    .then((data) => {
      const { error, result, response } = data;
      res = result;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

module.exports.getOg = getOg;
