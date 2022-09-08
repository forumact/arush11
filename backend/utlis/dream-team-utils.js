const chalk = require("chalk");
const helper = require("../helpers/helper");
const log = console.log;
var _ = require("lodash");
const axios = require("axios");
const logger = require('../utlis/logger');

/**
 *
 * @param {Array} Player
 * @param {Aray} passdata
 * @param {Array} captains
 *
 * @returns Array
 */
const dreamTeamGener = async (Player, passdata, captains) => {
  selected = 0;
  let processed = 1;
  let selectedTeams = [];
  let finaldTeams = [];
  let sampledTeam = [];

  while (selected < passdata.nt) {
    selectedTeamsUpdated = null;
    let randCombo = await helper.chooseComboRandom(passdata.combo);
    let randPart = await helper.chooseComboRandom(passdata.partition);
    var [team_n1, team_n2] = randPart;
    var [numWks, numBats, numArs, numBowls] = randCombo;
    wks = await helper.selectPlayers(
      await helper._filterByColumnValue(Player, "role", "WK"),
      numWks
    );
    bats = await helper.selectPlayers(
      await helper._filterByColumnValue(Player, "role", "BAT"),
      numBats
    );
    ars = await helper.selectPlayers(
      await helper._filterByColumnValue(Player, "role", "AR"),
      numArs
    );
    bowls = await helper.selectPlayers(
      await helper._filterByColumnValue(Player, "role", "BOWL"),
      numBowls
    );
    sampledTeam = wks.concat(bats, ars, bowls);

    // Update selected teams list based on whether the sampled team fulfills all eligibility criteria.
    selectedTeamsUpdated = await _updateSelectedTeams(
      Player,
      sampledTeam,
      selectedTeams,
      selected,
      captains,
      passdata,
      randPart
    );

    if (selectedTeamsUpdated.status) {
      let playerArray = [];
      for await (let player of selectedTeamsUpdated.team) {
        let saved = {
          _id: player._id,
          name: player.name,
          role: player.role,
          picture: player.picture,
          team: player.team,
          credits: player.credits,
          status: player.status,
          star: player.star,
          createdAt: player.createdAt,
          __v: player.__v,
          captain: player.captain,
          vcaptain: player.vcaptain,
        };
        playerArray.push(saved);
      }
      selectedTeams = [...selectedTeams, playerArray];
      if (passdata.save == "save") {
        let dbsave = await teamSave(
          selectedTeamsUpdated.team,
          selected,
          passdata.matchid,
          passdata.userid
        );
      }

      selected = selected + 1;
    }
    if (processed > passdata.np) {
      log(chalk.redBright("Software is short for selected team combinations"));
      return selectedTeams;
    }
    log(chalk.yellow(`selected: ${selected}, processed: ${processed}`));
    processed++;
  }
  return selectedTeams;
};

/**
 *
 * @param {*} Player
 * @param {*} sampledTeam
 * @param {*} selectedTeams
 * @param {*} selected
 * @param {*} captains
 * @param {*} passdata
 * @returns
 */
const _updateSelectedTeams = async (
  Player,
  sampledTeam,
  selectedTeams,
  selected,
  captains,
  passdata,
  randPart
) => {
  var results = new Object();
  let clonedSample = sampledTeam;
  let clonedSelected = selectedTeams;
  let { points_start, points_end } = passdata;

  let [team_n1, team_n2] = randPart;

  // let uniqueTeamCriteria = true;
  let minPointsCriteria = await checkMinTeamPointsCriteria(
    clonedSample,
    points_start
  );
  if (!minPointsCriteria) {
    // log(chalk.cyan("Rejected due to minPointsCriteria"));
    logger.info(`Rejected due to minPointsCriteria`);
    results["status"] = false;
    return results;
  }
  let maxPointsCriteria = await checkMaxTeamPointsCriteria(
    clonedSample,
    points_end
  );
  if (!maxPointsCriteria) {
    // log(chalk.cyan("Rejected due to maxPointsCriteria"));
    logger.info(`Rejected due to maxPointsCriteria`);
    results["status"] = false;
    return results;
  }
  let [minPlayersCriteria, sampledTeamNew] = await checkMinPlayersTeamCriteria(
    Player,
    clonedSample,
    passdata,
    randPart
  );
  if (!minPlayersCriteria) {
    // log(chalk.cyan("Rejected due to minPlayersCriteria"));
    logger.info(`Rejected due to minPlayersCriteria`);
    results["status"] = false;
    return results;
  }

  let clonedSample2 = await captainfix(
    sampledTeamNew,
    captains,
    selected,
    passdata
  );

  let clonedSample3 = await viceCaptainfix(
    clonedSample2,
    captains,
    selected,
    passdata
  );

  // if (clonedSelected.length > 0) {
  let [uniqueTeamCriteria, clonedSample4] = await checkUniqueTeamCriteria(
    clonedSample3,
    clonedSelected,
    passdata
  );

  if (!uniqueTeamCriteria) {
    log(chalk.cyan("Rejected due to uniqueTeamCriteria"));
    logger.info(`Rejected due to uniqueTeamCriteria`);
    results["status"] = false;
    results["team"] = clonedSample4;
    return results;
  }

  if (
    maxPointsCriteria &&
    uniqueTeamCriteria &&
    minPointsCriteria &&
    minPlayersCriteria
  ) {
    results["status"] = true;
    results["team"] = clonedSample4;
    return results;
  }
  return (results["status"] = false);
};

/**
 *
 * @param {*} sampledTeam
 * @param {*} maxPoints
 * @returns
 */
const checkMaxTeamPointsCriteria = async (sampledTeam, maxPoints) => {
  let totalUnitPrice = _.sumBy(sampledTeam, (item) => Number(item.credits));
  return parseFloat(totalUnitPrice) <= parseFloat(maxPoints);
};

/**
 *
 * @param {*} sampledTeam
 * @param {*} minPoints
 * @returns
 */
const checkMinTeamPointsCriteria = async (sampledTeam, minPoints) => {
  let totalUnitPrice = _.sumBy(sampledTeam, (item) => Number(item.credits));
  return parseFloat(totalUnitPrice) >= parseFloat(minPoints);
};

/**
 *
 * @param {*} Player
 * @param {*} sampledTeamNew
 * @param {*} passdata
 * @returns
 */
const checkMinPlayersTeamCriteria = async (
  Player,
  sampledTeamNew,
  passdata,
  randPart
) => {
  let modified = false;
  let tDemography = await teamDemography(sampledTeamNew);

  let { team1, team2 } = passdata;
  let [team_n1, team_n2] = randPart;
  let teamcount1 = tDemography[team1].length;
  let teamcount2 = tDemography[team2].length;

  logger.info(`${team1}, ${team_n1}, ${teamcount1}`);
  logger.info(`${team2}, ${team_n2}, ${teamcount2}`);

  if (teamcount1 > team_n1) {
    let removeLoop = teamcount1 - team_n1;
    modified = true;
    logger.info(`Going to remove ${removeLoop} players from ${team1}`);
    sampledTeamNew = await _playersalter(
      Player,
      sampledTeamNew,
      tDemography,
      team1,
      team2,
      removeLoop
    );
  }
  if (teamcount2 > team_n2) {
    let removeLoop = teamcount2 - team_n2;
    modified = true;
    logger.info(`Going to remove ${removeLoop} players from ${team2}`);

    sampledTeamNew = await _playersalter(
      Player,
      sampledTeamNew,
      tDemography,
      team2,
      team1,
      removeLoop
    );
  }

  let rr = _.groupBy(sampledTeamNew, "team");
  let status = rr[team1].length == team_n1 && rr[team2].length == team_n2;
  if (status && modified) {
    logger.info("Team modified to match minPlayersTeamCriteria");
  }
  return [status, sampledTeamNew];
};

/**
 *
 * @param {*} Player
 * @param {*} sampledTeamNew
 * @param {*} tDemography
 * @param {*} sourceteam
 * @param {*} targetteam
 * @param {*} removeLoop
 * @returns
 */
const _playersalter = async (
  Player,
  sampledTeamNew,
  tDemography,
  sourceteam,
  targetteam,
  removeLoop
) => {
  let addPlayerArray = await helper._filterByColumnValue(
    Player,
    "team",
    targetteam
  );

  let availablePlayers = _.differenceBy(
    addPlayerArray,
    tDemography[targetteam],
    "name"
  );

  let playersRole = _.groupBy(availablePlayers, "role");
  let availablePlayersrolekeys = Object.keys(playersRole);

  for (let inc = 0; inc < removeLoop; inc++) {
    let removeRole = _.sample(availablePlayersrolekeys);
    // console.log('removeRole', removeRole);
    let fillterAddplayer = _.filter(availablePlayers, ["role", removeRole]);

    if (fillterAddplayer.length == 0) {
      continue;
    }
    let targetplayer = _.sample(fillterAddplayer);

    // _fetchPlayerToReplace()

    let existingplayer = _.findIndex(sampledTeamNew, {
      name: targetplayer.name,
    });

    if (existingplayer > 0) {
      // log(chalk.redBright(`Can't alter same player from the team`));
      logger.info(`Can't alter same player from the team`);
      continue;
    }

    let removeArray = _.filter(tDemography[sourceteam], {
      star: "inactive",
      role: removeRole,
    });
    let removePlayer = _.sample(removeArray);
    if (!removePlayer) {
      // log(
      //   chalk.redBright(`Can't remove ${removeRole} role player from the team`)
      // );
      logger.info(`Can't remove ${removeRole} role player from the team`);
      continue;
    }
    var evens = _.remove(sampledTeamNew, function (player) {
      return player.team == sourceteam && removePlayer.name == player.name;
    });

    var alteraa = _.remove(availablePlayers, function (player) {
      return targetplayer.name == player.name;
    });

    sampledTeamNew.push(targetplayer);
  }
  return sampledTeamNew;
};

/**
 *
 * @param {*} sampledTeam
 * @param {*} captains
 * @param {*} selected
 * @param {*} passdata
 * @param {*} recursive
 * @returns
 */
const captainfix = async (
  sampledTeam,
  captains,
  selected,
  passdata,
  recursive = 0
) => {
  let clonedTeam = [];
  let findCap = "notfind";
  clonedTeam = _.shuffle(sampledTeam);
  let availableCaptains = _.filter(captains, ["captain", "active"]);
  if (availableCaptains.length) {
    let need = await _select_captains_from_selection(
      availableCaptains,
      clonedTeam,
      findCap
    );
    findCap = need.findCap;
    clonedTeam = need.updated;
  } else if (findCap !== "find" && passdata.cpt == "both") {
    let need = await _select_captains_formula(
      passdata,
      clonedTeam,
      findCap,
      recursive
    );
    findCap = need.findCap;
    clonedTeam = need.updated;
  }
  // Suppose if user not selected the captains
  else if (findCap !== "find" && passdata.cpt != "both") {
    let need = await _select_captains_formula(
      passdata,
      clonedTeam,
      findCap,
      recursive
    );
    findCap = need.findCap;
    clonedTeam = need.updated;
  }

  if (findCap !== "find" && recursive < 7) {
    recursive = recursive + 1;
    clonedTeam = await captainfix(
      clonedTeam,
      captains,
      selected,
      passdata,
      recursive
    );
  }
  return clonedTeam;
};

/**
 *
 * @param {*} sampledTeam
 * @param {*} captains
 * @param {*} selected
 * @param {*} passdata
 * @param {*} recursive
 * @returns
 */
const viceCaptainfix = async (
  sampledTeam,
  captains,
  selected,
  passdata,
  recursive = 0
) => {
  let clonedTeam = [];
  let findVCap = "notfind";
  clonedTeam = _.shuffle(sampledTeam);
  let availableVCaptains = _.filter(captains, ["vcaptain", "active"]);

  if (availableVCaptains.length) {
    let need = await _select_vicecaptains_from_selection(
      availableVCaptains,
      clonedTeam,
      findVCap
    );
    findVCap = need.findVCap;
    clonedTeam = need.updated;
  } else if (findVCap !== "find" && passdata.vcpt == "both") {
    let need = await _select_vicecaptains_formula(
      passdata,
      clonedTeam,
      findVCap,
      recursive
    );
    findVCap = need.findVCap;
    clonedTeam = need.updated;
  } else if (findVCap !== "find" && passdata.vcpt != "both") {
    let need = await _select_vicecaptains_formula(
      passdata,
      clonedTeam,
      findVCap,
      recursive
    );
    findVCap = need.findVCap;
    clonedTeam = need.updated;
  }
  if (findVCap !== "find" && recursive < 7) {
    recursive = recursive + 1;
    clonedTeam = await viceCaptainfix(
      clonedTeam,
      captains,
      selected,
      passdata,
      recursive
    );
  }
  return clonedTeam;
};

/**
 *
 * @param {*} sampledTeam
 * @returns
 */
const teamDemography = async (sampledTeam) => {
  let teamDemography1 = _.groupBy(sampledTeam, "team");
  return teamDemography1;
};

/**
 *
 * @param {*} sampledTeam
 * @param {*} selectedTeams
 * @returns
 */
const checkUniqueTeamCriteria = async (
  sampledTeam,
  selectedTeams,
  passdata,
  recursive = 0
) => {
  let result = true;
  for (let inc = 0; inc < selectedTeams.length; inc++) {
    let teamExist = await compareObject(sampledTeam, selectedTeams[inc], inc);
    if (teamExist) {
      result = false;
    }
  }

  if (result === false && recursive < 5) {
    let [captainupdateflag, sampledTeam1] = await _swapcaptains(
      sampledTeam,
      passdata,
      recursive
    );
    recursive = recursive + 1;
    if (captainupdateflag) {
      let [resResult, resSampleTeam] = await checkUniqueTeamCriteria(
        sampledTeam1,
        selectedTeams,
        passdata,
        recursive
      );
      result = resResult;
      sampledTeam = resSampleTeam;
      if (result) {
        logger.info(`Team adjust in unique team criteria!`);
        return [result, sampledTeam];
      }
    }
  }
  return [result, sampledTeam];
};

/**
 *
 * @param {*} sampleTeam
 * @param {*} teamnumber
 * @param {*} matchid
 * @param {*} userid
 * @returns
 */
const teamSave = async (sampleTeam, teamnumber, matchid, userid) => {
  try {
    let playerArray = [];
    for await (let player of sampleTeam) {
      let saved = {
        name: player.name,
        role: player.role,
        picture: player.picture,
        team: player.team,
        credits: player.credits,
        points: 0,
        status: player.status,
        star: player.star,
        captain: player.captain,
        vcaptain: player.vcaptain,
        teamnumber: parseInt(teamnumber),
      };
      playerArray.push(saved);
    }
    let dreamTeam = {
      matchid: matchid,
      userid: userid,
      teamnumber: parseInt(teamnumber),
      players: playerArray,
    };

    const saveddreamteam = await axios.post(
      process.env.API_ENDPOINT + "save_dreamteam",
      {
        params: {
          dreamTeam: dreamTeam,
        },
      }
    );
    return saveddreamteam;
  } catch (err) {
    logger.info(`${err} while finding from post collection`);
  }
  return true;
};

/**
 *
 * @param {*} source
 * @param {*} target
 * @param {*} inc
 * @returns
 */
const compareObject = async (source, target, inc) => {
  let res = _.intersectionWith(source, target, _.isEqual);
  // console.log(`res${inc}`, res.length);
  if (res.length === 11) {
    return true;
  }
  return false;
};

/**
 *
 * @param {*} sampledTeam
 * @param {*} passdata
 * @param {*} recursive
 * @returns
 */
async function _swapcaptains(sampledTeam, passdata, recursive) {
  let captainupdateflag = false;
  let captainRole = await helper.fetchCaptainRole(passdata, recursive);

  if (passdata.cpt != "both") {
    let currentTeamWp = _.filter(sampledTeam, {
      captain: "inactive",
      vcaptain: "inactive",
      team: passdata.cpt,
      role: captainRole,
    });

    let newCaptainObj = _.sample(currentTeamWp);
    let newCaptainName = _.get(newCaptainObj, ["name"]);
    //
    for (let inc = 0; inc < sampledTeam.length; inc++) {
      sampledTeam[inc].captain = "inactive";
      if (sampledTeam[inc].name == newCaptainName) {
        sampledTeam[inc].captain = "active";
        captainupdateflag = true;
      }
    }
  }

  if (passdata.cpt == "both") {
    let winnigTeam = _.sample([passdata.team1, passdata.team2]);
    //
    let currentTeamWp = _.filter(sampledTeam, {
      captain: "inactive",
      vcaptain: "inactive",
      team: winnigTeam,
      role: captainRole,
    });

    let newCaptainObj = _.sample(currentTeamWp);
    let newCaptainName = _.get(newCaptainObj, ["name"]);

    for (let inc = 0; inc < sampledTeam.length; inc++) {
      sampledTeam[inc].captain = "inactive";
      if (sampledTeam[inc].name == newCaptainName) {
        sampledTeam[inc].captain = "active";
        captainupdateflag = true;
      }
    }
  }
  return [captainupdateflag, sampledTeam];
}

async function _select_captains_formula(
  passdata,
  clonedTeam,
  findCap,
  recursive
) {
  var results = new Object();
  let winnigTeam = null;

  let captainRole = await helper.fetchCaptainRole(passdata, recursive);

  if (passdata.cpt == "both") {
    winnigTeam = _.sample([passdata.team1, passdata.team2]);
  }
  if (passdata.cpt != "both") {
    winnigTeam = passdata.cpt;
  }

  let wpteamplayers = _.filter(clonedTeam, {
    team: winnigTeam,
    role: captainRole,
  });

  let wpteamplayersArrayRand = await _.sample(wpteamplayers);
  if (wpteamplayersArrayRand) {
    for await (let [key, value] of Object.entries(clonedTeam)) {
      clonedTeam[key].captain = "inactive";
      if (clonedTeam[key].name == wpteamplayersArrayRand.name) {
        findCap = "find";
        results["findCap"] = "find";
        clonedTeam[key].captain = "active";
      }
    }
  }

  results["updated"] = clonedTeam;

  return results;
}

async function _select_captains_from_selection(
  availableCaptains,
  clonedTeam,
  findCap
) {
  var results = new Object();
  let availableCaptainsArrRand = _.shuffle(availableCaptains);
  let pickc = await _.sample(availableCaptainsArrRand);
  for await (let [key, value] of Object.entries(clonedTeam)) {
    // Set Default inactive for captain to the each player
    clonedTeam[key].captain = "inactive";
    if (pickc.name == clonedTeam[key].name && findCap != "find") {
      console.info("c", selected, clonedTeam[key].name);
      findCap = "find";
      results["findCap"] = "find";
      clonedTeam[key].captain = "active";
    }
  }
  results["updated"] = clonedTeam;
  return results;
}

async function _select_vicecaptains_from_selection(
  availableVCaptains,
  clonedTeam,
  findVCap
) {
  var results = new Object();
  let availableVCaptainsArrRand = _.shuffle(availableVCaptains);

  let currentCaptains = _.filter(clonedTeam, ["captain", "active"]);

  let removedCaptains = _.differenceBy(
    availableVCaptainsArrRand,
    currentCaptains,
    'name'
  );

  let pickvc = await _.sample(removedCaptains);
  let pickC = _.get(currentCaptains, ["0", "name"]);

  for await (let [key, value] of Object.entries(clonedTeam)) {
    clonedTeam[key].vcaptain = "inactive";
    if (pickvc.name == clonedTeam[key].name && findVCap != "find") {
      console.info("vc", selected, clonedTeam[key].name);
      results["findVCap"] = "find";
      clonedTeam[key].vcaptain = "active";
    }
  }

  results["updated"] = clonedTeam;
  return results;
}

async function _select_vicecaptains_formula(
  passdata,
  clonedTeam,
  findVCap,
  recursive
) {
  var results = new Object();
  let winnigTeam = null;

  let vcaptainRole = await helper.fetchViceCaptainRole(passdata, recursive);

  if (passdata.vcpt == "both") {
    winnigTeam = _.sample([passdata.team1, passdata.team2]);
  }
  if (passdata.vcpt != "both") {
    winnigTeam = passdata.vcpt;
  }

  let wpteamplayers = _.filter(clonedTeam, {
    team: winnigTeam,
    captain: "inactive",
    role: vcaptainRole,
  });
  let wpteamplayersArrayRand = await _.sample(wpteamplayers);
  if (wpteamplayersArrayRand) {
    for await (let [key, value] of Object.entries(clonedTeam)) {
      clonedTeam[key].vcaptain = "inactive";
      if (clonedTeam[key].name == wpteamplayersArrayRand.name && findVCap != "find") {
        findVCap = "find";
        results["findVCap"] = "find";
        clonedTeam[key].vcaptain = "active";
      }
    }
  }
  results["updated"] = clonedTeam;
  return results;
}

// Meethod export to use other modules
module.exports.dreamTeamGener = dreamTeamGener;
