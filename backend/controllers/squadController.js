const axios = require("axios");
const config = require("config");
var helper = require("../helpers/index");
var _ = require("lodash");
const { body, validationResult } = require("express-validator");
const instance = axios.create({
  withCredentials: true,
});

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const squads_get = async (req, res, next) => {
  let result = [];
  let teamrole1 = [];
  let teamrole2 = [];
  let team1 = req.query.team1;
  let team2 = req.query.team2;
  let team1img = _.get(req.query, [team1]);
  let team2img = _.get(req.query, [team2]);
  console.log('team1img', team1img)
  let matchid = req.query.matchid;
  const { name, user_id } = req.cookies;
  let response = await axios.get(
    process.env.API_ENDPOINT + "fetch_players_by_team",
    {
      params: {
        team1: team1,
        team2: team2,
        status1: "active",
        status2: "inactive",
      },
    }
  );

  let playing11 = _.get(response, ['data', 'data']);

  const mymatch = await axios.post(process.env.API_ENDPOINT + "create_mymatch", {
    params: {
      matchid: matchid,
      userid: user_id,
      team1: team1,
      team1img: team1img,
      team2: team2,
      team2img: team2img,
      winningteam: "NA",
      pitchreport: "NA",
      winningposibility: "NA",
      players: playing11,
    },
  });

  const myplaying11 = await axios.get(
    process.env.API_ENDPOINT + "fetch_match_players",
    {
      params: {
        team1: team1,
        team2: team2,
        matchid: matchid,
      },
    }
  );
  let responseplaying11 = _.get(myplaying11, ["data", "data", "0", "players"]);
  responseplaying11 =_.orderBy(responseplaying11, ["status", "credits"], ["asc", "desc"]);  
  if (responseplaying11) {
     result.push(helper.groupByKey(responseplaying11, "team"));
  }

  let get_team1 = _.get(result, ["0", team1]);
  let get_team2 = _.get(result, ["0", team2]);

  teamrole1.push(_.groupBy(get_team1, "role"));
  teamrole2.push(_.groupBy(get_team2, "role"));


  res.render("squads", {
    result: result || [],
    teamrole1: teamrole1 || [],
    teamrole2: teamrole2 || [],
    team1: team1,
    team1img:team1img,
    team2img:team2img,
    team2: team2,
    matchid: matchid,
    destUrl: req.originalUrl,
    user: name ? name : "",
    title: "Squads",
  });

};

//export controller functions
module.exports = {
  squads_get,
};
