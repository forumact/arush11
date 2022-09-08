const SeriesService = require('../services/series-services');
const TeamsService = require('../services/teams-services');
const PlayersService = require('../services/players-services');

const sservice = new SeriesService();
const tservice = new TeamsService();
const pservice = new PlayersService();

const fetch_tournaments_details_api_get = async (req, res) => {
  try {
    let filter = {};
    if (req.query.tournament_name) {
      filter = {
        tournament_name: req.query.tournament_name,
      };
    } else if (req.query.status) {
      filter = {
        status: req.query.status,
      };
    }
    const data = await sservice.TournamentList({ filter });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
  }
}


const fetch_tournaments_by_id_api_get = async (req, res) => {
  try {
    let filter = {};
    if (req.query.tid) {
      filter = {
        tid: req.query.tid,
      };
    }

    const data = await sservice.FetchTournamentById({ filter });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
  }
}

const fetch_teams_details_api_get = async (req, res) => {
  try {
    let filter = {};
    if (req.query.tournament_name) {
      filter = {
        tournament_name: req.query.tournament_name,
      };
    } else if (req.query.status) {
      filter = {
        status: req.query.status,
      };
    }
    const data = await tservice.TeamList({ filter })
    res.send({
      status: 200,
      data: data,
    });

  } catch (err) {
    console.error(err);

  }

}

const fetch_team_by_id_api_get = async (req, res) => {
  try {
    let filter = {};
    if (req.query.tmid) {
      filter = {
        tmid: req.query.tmid,
      };
    }
    const data = await tservice.FetchTeamById({ filter })
    res.send({
      status: 200,
      data: data,
    });

  } catch (err) {
    console.error(err);

  }

}

const add_tournament_api_post = async (req, res) => {
  try {
    const { tid, name, status } = req.body.params;

    const filter = tid
      ? {
        tid: tid,
      }
      : {};

    const tupdate = await sservice.CreateTournament({ filter, tid, name, status });
    res.send({
      status: 200,
      data: tupdate,
    });

  } catch (err) {

  }
}

const delete_tournament_api_delete = async (req, res) => {
  try {
    const { id } = req.query;
    const tdelete = await sservice.DeleteTournament({ id });
    res.send({
      status: 200,
      data: tdelete,
    });
  } catch (err) {

  }
}

const add_team_api_post = async (req, res) => {
  try {
    const { tmid, tournament_name, teamname, status, image } = req.body.params;
    const filter = tmid
      ? {
        tmid: tmid,
      }
      : {};
      console.log(tmid, tournament_name, teamname, status, image)
    const team = await tservice.CreateTeam({ filter, tmid, tournament_name, teamname, status, image });
    res.send({
      status: 200,
      data: team,
    });
  } catch (err) {

  }
}


const delete_team_api_post = async (req, res) => {
  try {
    const { id, team } = req.query;
    const data = await tservice.DeleteTeam({ id });
    const data1 = await pservice.DeleteAllPlaerByTeam({ team });

    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}



//export controller functions
module.exports = {
  fetch_tournaments_details_api_get,
  fetch_tournaments_by_id_api_get,
  fetch_teams_details_api_get,
  fetch_team_by_id_api_get,
  add_tournament_api_post,
  add_tournament_api_post,
  delete_tournament_api_delete,
  add_team_api_post,
  delete_team_api_post
}