const axios = require('axios');
var _ = require('lodash');
// const config = require('config');
var helper = require('../helpers/index');
const {
  body,
  validationResult
} = require('express-validator');
const instance = axios.create({
  withCredentials: true
});
/* Front-end UI - Admin - Start */
//GET '/players'
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const players_get = async (req, res, next) => {
  let teamrole = [];
  const tournamentsList = await axios.get(process.env.API_ENDPOINT + 'fetch_tournaments_details', {});
  let teamsList = await axios.get(process.env.API_ENDPOINT + 'fetch_teams_details', {});
  const players = await axios.get(process.env.API_ENDPOINT + 'fetch_all_players', {
    params: {
      team: req.params.team || req.query.team
    }
  });

  let playersOrder = _.orderBy(players.data.data, ["status", "credits"], ["asc", "desc"]);
  teamrole.push(_.groupBy(playersOrder, "role"));
  res.render("players", {
    players: players.data.data || [],
    teamrole: teamrole,
    team1: req.query.team || 'sl-w',
    matchid: 'matchid',
    teamsList: teamsList.data.data || [],
    tournamentsList: tournamentsList.data.data || [],
    destUrl: req.originalUrl,
    user: req.cookies ? req.cookies.name : '',
    title: "Players"
  });
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const player_by_id_get = async (req, res, next) => {
  let destUrl = helper.objectToQueryString(req.query).replace('dest=', '');
  let teamsList = await axios.get(process.env.API_ENDPOINT + 'fetch_teams_details', {});
  const resp = await axios.get(process.env.API_ENDPOINT + 'fetch_player_by_id', {
    params: {
      id: req.params.id
    }
  });
  res.render("player-edit", {
    data: resp.data.data,
    destUrl: destUrl,
    teamsList: teamsList.data.data || [],
    user: req.cookies ? req.cookies.name : '',
    title: 'Edit Player'
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const add_player_get = async (req, res, next) => {
  let teamsList = await axios.get(process.env.API_ENDPOINT + 'fetch_teams_details', {});
  res.render("player-add", {
    teamsList: teamsList.data.data || [],
    numOfPlayers: req.query.numOfPlayers ? req.query.numOfPlayers : 0,
    selectedTeam: req.query.team ? req.query.team : '',
    playing11: req.query.status ? req.query.status : 'inactive',
    user: req.cookies ? req.cookies.name : '',
    title: 'Add Player'
  });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const add_player_post = async (req, res, next) => {
  let playersform = req.body;
  for (let inc = 0; inc < req.body.numOfPlayers; inc++) {
    const resp = await axios.post(process.env.API_ENDPOINT + 'add_player', {
      params: {
        name: playersform['name_' + inc],
        role: playersform['role_' + inc],
        picture: playersform['picture_' + inc],
        team: playersform['team_' + inc],
        credits: parseFloat(playersform['credits_' + inc]),
        status: playersform['status_' + inc] || 'inactive',
        star: playersform['star_' + inc] || 'inactive',
        captain: req.body.captain || 'inactive',
        vcaptain: req.body.vcaptain || 'inactive',
      }
    });
  }
  req.flash('success', `${req.body.numOfPlayers} Player added Successfully!`);
  res.status(200).redirect('/admin/player/add');
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const update_player_by_id_post = async (req, res, next) => {
  const resp = await axios.post(process.env.API_ENDPOINT + 'update_player_by_id', {
    params: {
      id: req.body.id,
      name: req.body.name,
      role: req.body.role,
      picture: req.body.picture,
      team: req.body.team,
      credits: parseFloat(req.body.credits),
      status: req.body.status || 'inactive',
      star: req.body.star || 'inactive',
      captain: req.body.captain || 'inactive',
      vcaptain: req.body.vcaptain || 'inactive',
      destUrl: req.body.destUrl || '',
    }
  });
  req.flash('success', `<strong>${req.body.name}</strong> details updated Successfully!`);
  res.redirect(resp.data.destUrl);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const delete_player_by_id_get = async (req, res, next) => {
  const resp = await axios.post(process.env.API_ENDPOINT + 'delete_player_by_id', {
    params: {
      id: req.params.id,
    }
  });
  res.status(200).redirect('/admin/players');
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const tournament_get = async (req, res, next) => {
  let selectedTournament = []
  const tournamentsList = await axios.get(process.env.API_ENDPOINT + 'fetch_tournaments_details', {});
  if (req.params.tournament_id) {
    selectedTournament = _.filter(tournamentsList.data.data, ['_id', req.params.tournament_id]);
  }
  res.render("tournament", {
    user: req.cookies ? req.cookies.name : '',
    tournamentList: tournamentsList.data.data || [],
    selectedTournament: selectedTournament[0] || [],
    title: "Add Tournament"
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const tournament_post = async (req, res, next) => {
  try {
    const resp = await axios.post(process.env.API_ENDPOINT + 'addtournament', {
      params: {
        id: req.body.id,
        name: req.body.tournament_name,
        machine_name: req.body.tournament_machine_name,
        status: req.body.status || 'inactive',
      }
    });
  } catch (err) {
    console.error(err.data);
  }
  req.flash('success', `${req.body.tournament_name} is updated Successfully!`);
  res.status(200).redirect('/admin/tournament');
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const tournament_delete_get = async (req, res, next) => {
  try {
    const resp = await axios.delete(process.env.API_ENDPOINT + 'deletetournament', {
      params: {
        id: req.query.id,
      }
    });
  } catch (err) {
    console.error(err.data);
  }
  req.flash('success', `${req.query.id} is deleted Successfully!`);
  res.status(200).redirect('/admin/tournament/add');
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const team_get = async (req, res) => {
  let selectedTeam = [];
  const tournamentsList = await axios.get(process.env.API_ENDPOINT + 'fetch_tournaments_details', {});
  let teamsList = await axios.get(process.env.API_ENDPOINT + 'fetch_teams_details', {});
  if (req.params.team_id) {
    selectedTeam = _.filter(teamsList.data.data, ['_id', req.params.team_id]);
  }
  res.render("team", {
    tournamentsList: tournamentsList.data.data || [],
    teamsList: teamsList.data.data || [],
    selectedTeam: selectedTeam[0] || [],
    user: req.cookies ? req.cookies.name : '',
    title: "Add Team"
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const team_post = async (req, res, next) => {
  try {
    const resp = await axios.post(process.env.API_ENDPOINT + 'addteam', {
      params: {
        tournament_name: req.body.tournament_name,
        teamname: req.body.teamname,
        image: req.body.image,
        status: req.body.status || 'inactive',
      }
    });
  } catch (err) {
    console.error(err);
  }
  req.flash('success', `${req.body.teamname} is updated Successfully!`);
  res.status(200).redirect('/admin/team/add');
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const team_delete_get = async (req, res) => {
  try {    
    const resp = await axios.delete(process.env.API_ENDPOINT + 'delete_team', {
      params: {
        id: req.params.id,
        team: req.query.team,
      }
    });
  } catch (err) {
    console.error(err.data);
  }
  req.flash('success', `${req.params.id} is deleted Successfully!`);
  res.status(200).redirect('/admin/team');
}
//export controller functions
module.exports = {
  tournament_get,
  tournament_post,
  tournament_delete_get,
  team_get,
  team_post,
  team_delete_get,
  add_player_get,
  add_player_post,
  players_get,
  player_by_id_get,
  delete_player_by_id_get,
  update_player_by_id_post,
};