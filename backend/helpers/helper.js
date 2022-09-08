var _ = require("lodash");

/**
 *
 * @param {*} array
 * @param {*} column
 * @param {*} value
 * @returns
 */
const _filterByColumnValue = async (array, column, value) => {
  let result = await _.filter(array, [column, value]);
  return result;
};

/**
 *
 * @param {*} arr
 * @param {*} num
 * @returns
 */
const chooseRandom = async (arr, num = 1) => {
  const res = [];
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};

/**
 *
 * @param {*} arr
 * @param {*} num
 * @returns
 */
const chooseComboRandom = async (arr, num = 1) => {
  let res = "";
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res = arr[random];
    i++;
  }
  return res;
};

/**
 *
 * @param {*} obj
 * @returns
 */
const objectToQueryString = async (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(p + "=" + obj[p]);
    }
  return str.join("&");
};

/**
 *
 * @param {*} players
 * @param {*} req
 * @returns
 */
const selectPlayers = async (players, req) => {
  var availableStars = await _filterByColumnValue(players, "star", "active");
  var availableNonStars = await _filterByColumnValue(
    players,
    "star",
    "inactive"
  );

  var numStars = availableStars.length;
  if (numStars >= req) {
    return_players = chooseRandom(availableStars, req);
  } else {
    req = req - numStars;
    return_players = await chooseRandom(availableNonStars, req);
    return_players = return_players.concat(availableStars);
  }
  return return_players;
};

/**
 *
 * @param {*} Array
 * @param {*} msg
 */
const printCaptain = async (Array, msg) => {
  console.log(msg);
  var availableCaptains = await _filterByColumnValue(
    Array,
    "captain",
    "active"
  );
  console.table(availableCaptains);
};

/**
 *
 * @param {*} Array
 * @param {*} msg
 */
const printTeam = async (Array, msg) => {
  console.log(msg);
  console.table(Array, ["name", "captain", "vcaptain"]);
};

/**
 *
 * @param {*} Array
 * @param {*} msg
 */
const printTable = async (Array, msg) => {
  console.log(msg);
  console.table(Array);
};

/**
 *
 * @param {*} passdata
 */
const fetchCaptainRole = async (passdata, recursive) => {
  let captainRole = null;
  captainRole = passdata.cp;
  // if (passdata.cp == "WK") {
  //   captainRole = ["WK"];
  // }
  // if (passdata.cp == "BAT") {
  //   captainRole = ["BAT"];
  // }
  // if (passdata.cp == "AR") {
  //   captainRole = ["AR"];
  // }
  // if (passdata.cp == "BOWL") {
  //   captainRole = ["BOWL"];
  // }
  captainRole = _.sample(captainRole);
  return captainRole;
};

const fetchViceCaptainRole = async (passdata, recursive) => {
  let vcaptainRole = null;
  vcaptainRole = passdata.vcp;
  // if (passdata.vcp == "WK") {
  //   vcaptainRole = ["WK"];
  // }
  // if (passdata.vcp == "BAT") {
  //   vcaptainRole = ["BAT"];
  // }
  // if (passdata.vcp == "AR") {
  //   vcaptainRole = ["AR"];
  // }
  // if (passdata.vcp == "BOWL") {
  //   vcaptainRole = ["BOWL"];
  // }

  vcaptainRole = _.sample(vcaptainRole);
  return vcaptainRole;
};

/**
 *
 */
module.exports._filterByColumnValue = _filterByColumnValue;
module.exports.printCaptain = printCaptain;
module.exports.printTeam = printTeam;
module.exports.printTable = printTable;
module.exports.selectPlayers = selectPlayers;
module.exports.chooseRandom = chooseRandom;
module.exports.chooseComboRandom = chooseComboRandom;
module.exports.objectToQueryString = objectToQueryString;
module.exports.fetchCaptainRole = fetchCaptainRole;
module.exports.fetchViceCaptainRole = fetchViceCaptainRole;
