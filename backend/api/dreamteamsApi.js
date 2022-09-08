const DreamteamService = require('../services/dreamteam-services');
var helper = require("../helpers/index");
var dreamTeamServices = require("../utlis/dream-team-utils");
const axios = require("axios");


const DteamService = new DreamteamService();


const delete_dreamteam_api_post = async (req, res) => {
  try {
    const { matchid } = req.body.params;
    const data = await DteamService.DeleteDreamTeamByMatchId({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}

const save_dreamteam_api_post = async (req, res) => {
  try {
    const { dreamTeam } = req.body.params;
    const data = await DteamService.CreateDreamTeam({ dreamTeam });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}

const fetchp_created_dreamteam_api_get = async (req, res) => {
  try {
    const { matchid } = req.query;
    const data = await DteamService.FetchPlayersForResultPage({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}


const dreamteam_pointsupdate_by_matchid_api_get = async (req, res) => {
  try {
    const { matchid } = req.query;
    const data = await DteamService.PlayerListFromDreamTeamByMatchId({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}

const dream_team_count_api_get = async (req, res) => {
  try {
    const { matchid } = req.query;
    const data = await DteamService.FetchDreamTeamCountByMatchId({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}

const update_points_api_post = async (req, res) => {
  try {

    let players = req.body.params.players;
    let { matchid } = req.body.params;
    const data = await DteamService.UpdatePlayerPointsByMatchId({ players, matchid });

    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}


const create_dreamteam_api_post = async (req, res) => {

  const result = [];
  const { players, processData, captains } = req.body.params;

  let teams = await dreamTeamServices.dreamTeamGener(
    players,
    processData,
    captains
  );
  teams.forEach(function (team, index) {
    result.push(helper.groupByKey(team, "role"));
  });


  let pitchreport = await axios.post(
    process.env.API_ENDPOINT + "update_pitchreport",
    {
      params: {
        matchid: processData.matchid,
        user_id: processData.userid,
        team1: processData.team1,
        team2: processData.team2,
        cp: processData.cp,
        cpt: processData.cpt,
        vcp: processData.vcp,
        vcpt: processData.vcpt,
        combo: processData.combo,
        partition: processData.partition,
        points_start: processData.points_start,
        points_end: processData.points_end,
        teamcount: teams.length,
      },
    }
  );

  // console.log('pitchreport', pitchreport)

  res.send({
    status: 200,
    data: result,
  });


}

//export controller functions
module.exports = {
  delete_dreamteam_api_post,
  save_dreamteam_api_post,
  fetchp_created_dreamteam_api_get,
  dreamteam_pointsupdate_by_matchid_api_get,
  dream_team_count_api_get,
  update_points_api_post,
  create_dreamteam_api_post
}