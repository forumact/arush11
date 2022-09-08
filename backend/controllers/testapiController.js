const fs = require("fs");
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');
const api_pull_score_get = async (req, res) => {
  let matchid = req.query.matchid;
  let rawdata = fs.readFileSync("./score/" + matchid + ".json");
  let score = JSON.parse(rawdata);
  res.status(200).send({
    res: score,
  });
};

const api_pull_squad_get = async (req, res) => {
  let url = req.query.url;
  let col_num = req.query.col_num;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("table tbody tr td:nth-child(" + col_num + ") span");
    console.log('listItems', listItems)
    const squads = [];
    listItems.each(function (idx, el) {
      const squad = { name: "", role: "" };
      squad.name = $(el).text(); // player name from espn crickinfo
      squad.role = $(el).parent().siblings().text(); // role from espn crickinfo
      squads.push(squad);
    });
    let orderplayers = _.orderBy(squads, ['role'], ['desc']);
    // console.log(orderplayers.length); // 2
    // console.log(orderplayers);
    res.status(200).send({
      squads: orderplayers,
    });
  } catch (err) {
    console.error(err);
  }
}
//export controller functions
module.exports = {
  // api_test_api_get,
  api_pull_score_get,
  api_pull_squad_get
};
