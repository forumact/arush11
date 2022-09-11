import axios from 'axios';
import _ from 'lodash';
import { groupByKey, getUniqueId } from '../utils';
const instance = axios.create({ baseURL: 'http://localhost:5000' });

/**
 * 
 * @param {*} details 
 * @param {*} numberofteam 
 */

 export const addPlayer = async (details, numberofteam) => {

  let uniqueArr = [];
  for (const [key, value] of Object.entries(details)) {
    uniqueArr[key] = value;
  }
  

  console.log(details);
  console.log('numberofteam', numberofteam);
  console.log(uniqueArr);

  for (let inc = 0; inc < numberofteam; inc++) {
    await instance.post('/api/add_player', {
      params: {
        pid: getUniqueId(10),
        name: uniqueArr['name_' + inc],
        role: uniqueArr['role_' + inc],
        picture: uniqueArr['picture_' + inc],
        team: uniqueArr['team_' + inc],
        credits: parseFloat(uniqueArr['credits_' + inc]),
        status: uniqueArr['status_' + inc] || 'active',
        star: uniqueArr['star_' + inc] || 'inactive',
        captain: 'inactive',
        vcaptain: 'inactive',
      }
    });
  }

}

export const fetchPlayersByTeam = async (team) => {
  let teamrole = [];
  const { data } = await axios.get('/api/fetch_all_players', {
    params: {
      team: team
    }
  });

  let playersOrder = _.orderBy(data.data, ["status", "credits"], ["asc", "desc"]);
  teamrole.push(_.groupBy(playersOrder, "role"));

  return teamrole || [];

}


export const fetchPlayersById = async (pid) => {
  const { data } = await axios.get('/api/fetch_player_by_id', {
    params: {
      pid: pid
    }
  });
  return data.data || [];

}

export const updatePlayerById = async (pid, team, name, role, picture, credits, status, star) => {
  const resp = await axios.post('/api/update_player_by_id', {
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

export const fetchMatchPlayersById = async (mid, pid) => {
  const { data } = await axios.get('/api/fetch_mymatch_player_by_id', {
    params: {
      mid: mid,
      pid: pid
    }
  });
  let response = _.get(data, ["data", "0", "players", "0"]);
  return response || [];

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

export const fetchSquads = async ({ matchid, user_id, team1, team1img, team2, team2img }) => {
  let response = await axios.get("/api/fetch_players_by_team",
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

export const createMyMatch = async ({ matchid, user_id, team1, team1img, team2, team2img, playing11 }) => {

  const mymatch = await axios.post("/api/create_mymatch", {
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

export const deleteMatch = async (matchid) => {
  const deletemymatch = await axios.get("/api/delete_mymatches",
    {
      params: {
        matchid: matchid,
      },
    }
  );

  console.log(deletemymatch);

}

export const fetchMatchPlayers = async ({ team1, team2, matchid }) => {

  let result = [];
  let teamrole1 = [];
  let teamrole2 = [];

  const myplaying11 = await axios.get("/api/fetch_match_players",
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

  return { teamrole1, teamrole2 }

}


export const fetchMyMatches = async () => {
  const { data } = await instance.get('/api/fetch_mymatches');
  return data.data || [];
}

export const fetchActivePlayerByMatch = async ({ team1, team2, matchid }) => {

  let result = [];
  let teamrole1 = [];
  let teamrole2 = [];

  const myplaying11 = await instance.get('/api/fetch_match_players', {
    params: {
      team1: team1,
      team2: team2,
      matchid: matchid,
    },
  });

  let response = _.get(myplaying11, ["data", "data", "0", "players"]);
  let response_filtered = _.filter(response, {
    status: "active",
  });

  if (response_filtered) {
    result.push(_.groupBy(response_filtered, "team"));
  }

  let get_team1 = _.get(result, ["0", team1]);
  let get_team2 = _.get(result, ["0", team2]);

  // console.log('get_team1', get_team1)

  teamrole1.push(_.groupBy(get_team1, "role"));
  teamrole2.push(_.groupBy(get_team2, "role"));

  // console.log('teamrole1', teamrole1)
  // console.log('teamrole2', teamrole2)
  return { teamrole1, teamrole2 }

}

export const pointsUpdate = async (matchid) => {
  const { data } = await axios.get("/api/dreamteam_pointsupdate_by_matchid",
    {
      params: {
        matchid: matchid,
      },
    }
  );

  return data.data || [];
}

export const saveCaptains = async (cresult, matchid, team) => {
  const playing11 = await axios.post("/api/savecaptain",
    {
      params: {
        results: cresult,
        matchid: matchid,
        teamname: team,
      },
    }
  );
  console.log(playing11);
}


export const fetchMyMatchCaptains = async (matchid, team1, team2) => {
  const { data } = await axios.get("/api/fetch_mymatch_captains",
    {
      params: {
        matchid: matchid,
        team1: team1,
        team2: team2,
      },
    }
  );

  return data.data || [];

}

export const fetchPlayerForPrediction = async ({ team1, team2, matchid, groupby }) => {
  let result = [];

  const myplaying11 = await instance.get('/api/fetch_match_players', {
    params: {
      team1: team1,
      team2: team2,
      matchid: matchid,
    },
  });

  let response = _.get(myplaying11, ["data", "data", "0", "players"]);
  let response_filtered = _.filter(response, {
    status: "active",
  });

  if (groupby === 'none') {
    return response_filtered;
  }

  if (groupby === 'role') {
    if (response_filtered) {
      result.push(_.groupBy(response_filtered, "role"));
    }
    return result;
  }


}
