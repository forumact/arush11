import axios from 'axios';
import _ from 'lodash';
import { groupByKey, getUniqueId } from '../utils';
const instance = axios.create({ baseURL: 'http://localhost:5000' });

/**
 * 
 * @param {*} teamdetails 
 */
 export const createTeam = async (teamdetails) => {
  const { tmid, tournament_name, teamname, status, image } = teamdetails;
  const resp = await axios.post('/api/addteam', {
    params: {
      tmid: tmid,
      tournament_name: tournament_name,
      teamname: teamname,
      image: image,
      status: status,
    }
  });

  return resp;

}

/**
 * 
 * @returns 
 */
export const fetchTeam = async () => {
  const { data } = await instance.get('/api/fetch_teams_details', {
    params: {
      status: "active",
    },
  });
  return data.data || [];
}

/**
 * 
 * @returns 
 */
export const fetchTeamAllTeam = async () => {
  const { data } = await instance.get('/api/fetch_teams_details');
  return data.data || [];
}


/**
 * 
 * @returns 
 */
export const fetchTeamByIdApi = async (tmid) => {
  const { data } = await instance.get('/api/fetch_team_by_id', {
    params: {
      tmid: tmid,
    }
  });
  return data.data || [];
}

export const deleteTeamApi = async (tmid, teamname) => {
  const resp = await axios.delete('/api/delete_team?id=' + tmid + '&team=' + teamname, {
    params: {
      id: tmid,
      team: teamname,
    }
  });
  return resp;
}

