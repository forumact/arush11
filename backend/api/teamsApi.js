const logger = require('../utlis/logger');
const PlayersService = require('../services/players-services');
const MymatchService = require('../services/mymatch-services');
const MycaptionsService = require('../services/captains-services');
const DreamteamService = require('../services/dreamteam-services');

const pservice = new PlayersService();
const mymatchService = new MymatchService();
const mycaptionsService = new MycaptionsService();
const dreamteamService = new DreamteamService();

const fetch_players_by_team_api_get = async (req, res) => {
  try {
    const filter = {
      team: {
        $in: [req.query.team1, req.query.team2],
      },
      status: {
        $in: [req.query.status1, req.query.status2],
      },
    };
    const data = await pservice.PlayerList({ filter });

    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }
}

const create_my_match_api_post = async (req, res) => {
  try {
    // console.log('----------')
    // console.log(req.body.params);
    const { matchid, userid, team1, team2, winningteam, pitchreport, winningposibility, players, team1img, team2img } = req.body.params;
    const data = await mymatchService.CreateUserMatch({ matchid, userid, team1, team2, winningteam, pitchreport, winningposibility, players, team1img, team2img });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }
}

const fetch_match_players_api_get = async (req, res) => {
  try {
    const { matchid } = req.query;
    const data = await mymatchService.fetchMyMatchPlayers({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }
}

const fetch_mymatch_player_by_id_api_get = async (req, res) => {
  try {
    const { mid, pid } = req.query;
    const data = await mymatchService.FetchMyMatchPlayersById({ mid, pid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }

}

const userview_update_player_by_id_api_post = async (req, res) => {
  try {
    const {
      matchid,
      pid,
      name,
      role,
      picture,
      team,
      credits,
      status,
      star,
      destUrl,
    } = req.body.params;
    const data = await mymatchService.UpdateMatchPlayer({ matchid, pid, name, role, picture, team, credits, status, star });
    res.send({
      status: 200,
      data: data,
      destUrl: destUrl,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }

}


const fetch_my_matches_api_get = async (req, res) => {
  try {
    const filter = (req.query.user_id && req.query.show !== 'all')
      ? {
        userid: req.query.user_id,
      }
      : {};

    const data = await mymatchService.FindMatchesByUserId({ filter });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }
}

const update_pitch_report_api_post = async (req, res) => {
  try {
    const { matchid, user_id, team1, team2, cp, cpt, vcp, vcpt, combo, partition, points_start, points_end, teamcount } = req.body.params;
    const data = await mymatchService.UpdatePitchReportByMatchId({ matchid, user_id, team1, team2, cp, cpt, vcp, vcpt, combo, partition, points_start, points_end, teamcount });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }
}


const update_match_status_api_post = async (req, res) => {
  try {
    const { matchid, status } = req.body.params;
    const data = await mymatchService.UpdateMatchStatusByMatchId({ matchid, status });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }
}


const delete_my_matches_api_get = async (req, res) => {
  try {
    const matchid = req.query.matchid;
    const data = await mymatchService.DeleteMatch({ matchid });
    const data1 = await mycaptionsService.DeleteCaptain({ matchid });
    const data2 = await dreamteamService.DeleteDreamTeamByMatchId({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    logger.info(`API Request Failed: ${err}`);
  }

}


//export controller functions
module.exports = {
  fetch_players_by_team_api_get,
  create_my_match_api_post,
  fetch_match_players_api_get,
  fetch_mymatch_player_by_id_api_get,
  userview_update_player_by_id_api_post,
  fetch_my_matches_api_get,
  update_pitch_report_api_post,
  update_match_status_api_post,
  delete_my_matches_api_get
}