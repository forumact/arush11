const PlayersService = require('../services/players-services');

const pservice = new PlayersService();

const fetch_all_players_api_get = async (req, res) => {
  try {
    const filter = req.query.team
      ? {
        team: req.query.team,
      }
      : {};
    const data = await pservice.PlayerList({ filter });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
  }
}

const fetch_player_by_id_api_get = async (req, res) => {
  try {
    const filter = req.query.pid
      ? {
        pid: req.query.pid,
      }
      : {};
    const data = await pservice.FindPlayerById(filter);
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
  }
}

const update_player_by_id_api_post = async (req, res) => {
  try {
    const { pid, name, role, picture, team, credits, status, star } = req.body.params;
    const filter = {
      pid: pid,
    }
    const data = await pservice.UpdatePlayerById({ filter, name, role, picture, team, credits, status, star });
    res.send({
      status: 200,
      data: data,
      destUrl: req.body.params.destUrl,
    });
  } catch (err) {

  }
}


const add_player_api_post = async (req, res) => {
  try {
    const { pid, name, role, picture, team, credits, status, star } = req.body.params;
    const filter = {
      pid: pid,
    }
    
    const data = await pservice.CreatePlayer({ filter, pid, name, role, picture, team, credits, status, star });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }

}

const delete_player_by_id_api_post = async (req, res) => {
  try {
    const id = req.body.params.id
    const data = await pservice.DeletePlaerById({ id });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {

  }
}


//export controller functions
module.exports = {
  fetch_all_players_api_get,
  fetch_player_by_id_api_get,
  update_player_by_id_api_post,
  add_player_api_post,
  delete_player_by_id_api_post
}