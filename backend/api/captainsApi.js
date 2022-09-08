const CaptainsService = require('../services/captains-services');

const cservice = new CaptainsService();

const fetch_mymatch_captains_api_get = async (req, res) => {
  try {
    const { matchid } = req.query;
    const data = await cservice.CaptainList({ matchid });
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    console.error(err);
  }
}


const save_captain_api_post = async (req, res) => {
  try {
    const { matchid, teamname, results } = req.body.params;
    const data = await cservice.CreateCaptain({ matchid, teamname, results });
    res.send({
      status: 200,
      data: data,
    });
  } catch (error) {

  }

}

//export controller functions
module.exports = {
  fetch_mymatch_captains_api_get,
  save_captain_api_post,
}