import jwt_decode from "jwt-decode";
import _ from 'lodash';

export function printDate() {
  const current = new Date();
  const date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
  return date;
}


export function getUniqueId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function rawDate(date) {
  return date ? date.substring(0, 10) : printDate();
}

export function groupByKey(array, key) {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
}

export function splitName(fullName) {
  const [first, last] = fullName.split(' ');
  let splitName = typeof last !== "undefined" ? first.substring(0, 1) + ' ' + (last.length > 10 ? last.substring(0, 10) + '...' : last) : fullName.substring(0, 11);
  return splitName;
}

export function ordinalSuffixOf(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

export const storeUserjson = (token) => {
  localStorage.setItem('token', token);
}

export const getUserjson = () => {
  var retrievedObject = localStorage.getItem('token');
  if (retrievedObject) {
    var decoded = jwt_decode(retrievedObject);
    return decoded;
  }

  return false;

}

export const getcombo = () => {

  let combo = {
    "0": ["1, 3, 2, 5"],
    "1": ["1, 3, 3, 4"],
    "2": ["1, 4, 3, 3"],
    "3": ["1, 4, 2, 4"],
    "4": ["1, 4, 1, 5"],
    "5": ["1, 5, 2, 3"],
    "6": ["1, 5, 1, 4"],
    "7": ["1, 6, 1, 3"],
    "8": ["1, 3, 1, 6"],
    "9": ["1, 3, 4, 3"],
    "10": ["2, 3, 3, 3"],
    "11": ["2, 3, 2, 4"],
    "12": ["2, 3, 1, 5"],
    "13": ["2, 4, 2, 3"],
    "14": ["2, 4, 1, 4"],
    "15": ["2, 5, 1, 3"],
    "16": ["3, 3, 2, 3"],
    "17": ["3, 4, 1, 3"],
    "18": ["3, 3, 1, 4"],
    "19": ["4, 3, 1, 3"]
  }

  return combo;
}


export const filterCombo = (data) => {
  const comboArray = [];
  for (const [key, value] of Object.entries(data)) {
    let cvalue = _.get(value, ['combo']);
    if (cvalue && cvalue.length) {
      comboArray.push(cvalue.split("_").map(Number));
    }
  }

  var filtered = comboArray.filter(Boolean);
  return filtered;
};

export const filterPartition = (data) => {
  const PartitionArray = [];
  for (const [key, value] of Object.entries(data)) {
    let partvalue = _.get(value, ['partition']);
    if (partvalue && partvalue.length) {
      PartitionArray.push(partvalue.split("_").map(Number));
    }
  }
  var filtered = PartitionArray.filter(Boolean);
  return filtered;
};

export const filterCaptainRole = (data) => {
  const CaptainRoleArray = [];
  for (const [key, value] of Object.entries(data)) {
    let rolevalue = _.get(value, ['crole']);
    if (rolevalue && rolevalue.length) {
      CaptainRoleArray.push(rolevalue);
    }
  }
  return CaptainRoleArray;
};

export const filterViceCaptainRole = (data) => {
  const vCaptainRoleArray = [];
  for (const [key, value] of Object.entries(data)) {
    let vicerolevalue = _.get(value, ['vcrole']);
    if (vicerolevalue && vicerolevalue.length) {
      vCaptainRoleArray.push(vicerolevalue);
    }
  }
  return vCaptainRoleArray;
};

export const preparePassData = (cookies, data, combo, part, captainRole, viceCaptainRole, matchid, team1, team2, e) => {

  let passdata = {
    userid: cookies ? cookies.user_id : 0,
    nt: _.get(data, ['nt']) ? _.get(data, ['nt']) : e.target.nt.value,
    np: _.get(data, ['np']) ? _.get(data, ['np']) : e.target.np.value,
    combo: combo,
    partition: part,
    points_start: _.get(data, ['ps']) ? _.get(data, ['ps']) : e.target.ps.value,
    points_end: _.get(data, ['pe']) ? _.get(data, ['pe']) : e.target.pe.value,
    team1: team1,
    team2: team2,
    matchid: matchid,
    save: e.target.save.value,
    cpt: e.target.cpt.value,
    vcpt: e.target.vcpt.value,
    cp: captainRole,
    vcp: viceCaptainRole,
  };

  return passdata;
};


export const printCaptain = (captain = null) => {
  let starClass = '';
  if (captain === 'active') {
    starClass = '<div class="captain fw-600">C</div>';
  }
  return starClass;
}

export const printVcaptain = (vcaptain = null) => {
  let starClass = '';
  if (vcaptain === 'active') {
    starClass = '<div class="vice-captain fw-600">VC</div>';
  }
  return starClass;
}

export const teamClass = (teamName, team1, team2) => {
  console.log(teamName, team1, team2);
  let teamClass;
  if (teamName === team1) {
    teamClass = 'team-1';
  } else {
    teamClass = 'team-2';
  }
  return teamClass;
}

export const getTeamPrecentage = (count, total) => {
  return ((count / total) * 100).toFixed(1);
}


export const getRandomClass = () => {
  var items = ['ra11-bg-primary', 'ra11-bg-dark', 'ra11-bg-primary', 'ra11-bg-success', 'ra11-bg-warning'];
  return items[Math.floor(Math.random() * items.length)];
}


export const createMatchlocalStorage = (items) => {
  localStorage.setItem('match', JSON.stringify(items));
}

export const deleteMatchlocalStorage = () => {
  localStorage.removeItem("match");
}

export const getMatchlocalStorage = () => {
  return JSON.parse(localStorage.getItem('match'));
}