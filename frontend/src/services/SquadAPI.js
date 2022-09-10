import axios from 'axios';
import _ from 'lodash';
import { groupByKey, getUniqueId } from '../utils';
const instance = axios.create({ baseURL: 'http://localhost:5000' });



export const fetchSquads = async (matchid, user_id, team1, team1img, team2, team2img) => {
  let response = await instance.get("/api/fetch_players_by_team",
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

  await createMyMatch({ matchid, user_id, team1, team1img, team2, team2img, playing11 });

  let matchplayers = await fetchMatchPlayers({ team1, team2, matchid });


  return matchplayers || [];
}


export const fetchMatchPlayers = async ({ team1, team2, matchid }) => {

  let result = [];
  let teamrole1 = [];
  let teamrole2 = [];

  console.log(team1, team2, matchid)

  const myplaying11 = await instance.get("/api/fetch_match_players",
    {
      params: {
        team1: team1,
        team2: team2,
        matchid: matchid,
      },
    }
  );

  let responseplaying11 = _.get(myplaying11, ["data", "data", "0", "players"]);
  responseplaying11 = _.orderBy(responseplaying11, ["status", "credits"], ["asc", "desc"]);
  if (responseplaying11) {
    result.push(groupByKey(responseplaying11, "team"));
  }

  let get_team1 = _.get(result, ["0", team1]);
  let get_team2 = _.get(result, ["0", team2]);

  teamrole1.push(_.groupBy(get_team1, "role"));
  teamrole2.push(_.groupBy(get_team2, "role"));

  // console.log('okok', teamrole1)
  // console.log('okok123', teamrole2)

  return { teamrole1, teamrole2 }

}


export const createMyMatch = async ({ matchid, user_id, team1, team1img, team2, team2img, playing11 }) => {

  const mymatch = await instance.post("/api/create_mymatch", {
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

  return mymatch;

}

export const updatePlayerById = async (pid, team, name, role, picture, credits, status, star) => {

  const resp = await instance.post('/api/update_player_by_id', {
    params: {
      pid: pid,
      name: name,
      role: role,
      picture: picture,
      team: team,
      credits: parseFloat(credits),
      status: status || 'inactive',
      star: star || 'inactive',
      captain: 'inactive',
      vcaptain: 'inactive',
    }
  });

  return resp;
}


export const updateMatchPlayerById = async (matchid, pid, team, name, role, picture, credits, status, star) => {
  await axios.post("/api/update_mymatch_player_by_id", {
    params: {
      matchid: matchid,
      pid: pid,
      name: name,
      role: role,
      picture: picture,
      team: team,
      credits: parseFloat(credits),
      status: status || "inactive",
      star: star || "inactive",
      captain: "inactive",
      vcaptain: "inactive",
    },
  }
  );
}