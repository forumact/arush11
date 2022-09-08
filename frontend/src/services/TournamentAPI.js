import axios from 'axios';
import _ from 'lodash';
import { groupByKey, getUniqueId } from '../utils';
const instance = axios.create({ baseURL: 'http://localhost:5000' });

/**
 * 
 * @param {*} tournamentdetails 
 */
export const createTournamentApi = async (tournamentdetails) => {
  const { tid, name, status } = tournamentdetails;
  console.log(tid, name, status)
  const resp = await axios.post('/api/addtournament', {
    params: {
      tid: tid,
      name: name,
      status: status,
    }
  });

  return resp;

}

/**
 * 
 * @returns 
 */
export const fetchTournament = async () => {
  const { data } = await instance.get('/api/fetch_tournaments_details');
  return data.data || [];
}


/**
 * 
 * @returns 
 */
export const fetchTournamentByIdApi = async (tmid) => {
  const { data } = await instance.get('/api/fetch_tournaments_by_id', {
    params: {
      tmid: tmid,
    }
  });
  return data.data || [];
}



/**
 * 
 * @param {*} value
 */
export const updateTournament = async (tid, name, status) => {
  // console.log(tid, name, status);
  let tournamentdetails = {
    tid: tid,
    name: name,
    status: status || 'inactive'
  }
  createTournamentApi(tournamentdetails)
}

/**
 * 
 * @param {*} id 
 */
export const deleteTournamentApi = async (id) => {
  const resp = await axios.delete('/api/deletetournament', {
    params: {
      id: id,
    }
  });
  return resp;
}

