const axios = require("axios");
var _ = require("lodash");
// Require logger.js
const logger = require('../utlis/logger');

/**
 *
 * @param {*} req
 * @param {*} res
 */
const series_get = async (req, res) => {
  let series = [];
  
  const tournamentsList = await axios.get(
    process.env.API_ENDPOINT + "fetch_tournaments_details",
    {
      params: {
        status: "active",
      },
    }
  );
  let teamsList = await axios.get(process.env.API_ENDPOINT + "fetch_teams_details", {
    params: {
      status: "active",
    },
  });

  series = _.groupBy(teamsList.data.data, "tournament_name");

  res.render("series", {
    series: series || [],
    user: req.cookies ? req.cookies.name : "",
    title: "Available Series",
  });
};
//export controller functions
module.exports = {
  series_get,
};
