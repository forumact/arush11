import axios from 'axios';
import _ from 'lodash';
import { groupByKey, getUniqueId } from '../utils';
const instance = axios.create({ baseURL: 'http://localhost:5000' });


export const deleteDreamTeam = async (matchid) => {
  const { data } = await instance.post("/api/delete_dreamteam",
    {
      params: {
        matchid: matchid
      },
    }
  );

  return data.data || [];
}


export const createDreamTeamSave = async (players, processData, captains) => {

  const { data } = await instance.post("/api/create_dreamteam",
    {
      params: {
        players: players,
        processData: processData,
        captains: captains
      },
    }
  );

  return data.data || [];

}

export const FetchCreatedDreamTeam = async (matchid) => {

  let result = [];
  let mockresult = [];

  const dreamTeam = await instance.get("/api/fetchp_created_dreamteam",
    {
      params: {
        matchid: matchid,
      },
    }
  );

  // for (let inc = 0; inc < dreamTeam.data.data.length; inc++) {
  //   mockresult.push(
  //     _.orderBy(dreamTeam.data.data[inc].players, ["points"], ["desc"])
  //   );
  // }

  // mockresult.forEach(function (team, index) {
  //   result.push(groupByKey(team, "role"));
  // });

  return dreamTeam;

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
export const updatePoints = async (matchid, players) => {

  console.log(matchid, players)
  const points = await instance.post("/api/updatepoints", {
    params: {
      players: players,
      matchid: matchid,
    },
  });

  await instance.post("/api/update_match_status", {
    params: {
      status: "C",
      matchid: matchid,
    },
  });

  return { points };

}


export const getDreamTeamCount = async (matchid) => {

  const { data } = await instance.get("/api/dreamteam_count",
    {
      params: {
        matchid: matchid,
      },
    }
  );

  return data.data || [];
}