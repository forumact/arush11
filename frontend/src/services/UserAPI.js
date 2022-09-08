import axios from 'axios';
import _ from 'lodash';
import { groupByKey, getUniqueId } from '../utils';
const instance = axios.create({ baseURL: 'http://localhost:5000' });

export const ra11login = async (email, password) => {
  let resp = await instance.post("/api/login", {
    params: {
      email: email,
      password: password,
    },
  });

  return resp.data;
  // console.log(resp);
}

export const register = async (name, email, password) => {

  const resp = await instance.post("/api/register", {
    params: {
      uid: getUniqueId(10),
      name: name,
      email: email,
      password: password,
    },
  });

  return resp;
}


export const fetchPeople = async () => {
  const { data } = await instance.get('/api/fetch_users');
  return data.data || [];
}


export const fetchPeopleByIdApi = async (uid) => {
  const { data } = await instance.get('/api/fetch_users_by_id', {
    params: {
      uid: uid
    }
  });
  return data.data || [];
}
