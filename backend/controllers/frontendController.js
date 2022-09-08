const axios = require("axios");
const config = require("config");
var helper = require("../helpers/index");
var _ = require("lodash");


/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const playing11_get = async (req, res, next) => {
  let result = [];
  let teamrole1 = [];
  let teamrole2 = [];
  let team1 = req.query.team1;
  let team2 = req.query.team2;
  let matchid = req.query.matchid;
  const { name, user_id } = req.cookies;

  const myplaying11 = await axios.get(
    process.env.API_ENDPOINT + "fetch_match_players",
    {
      params: {
        team1: team1,
        team2: team2,
        matchid: matchid,
      },
    }
  );
  let response = _.get(myplaying11, ["data", "data", "0", "players"]);
  let response_filtered = _.filter(response, {
    status: "active",
  });

  if (response_filtered) {
    result.push(_.groupBy(response_filtered, "team"));
  }

  let get_team1 = _.get(result, ["0", team1]);
  let get_team2 = _.get(result, ["0", team2]);

  teamrole1.push(_.groupBy(get_team1, "role"));
  teamrole2.push(_.groupBy(get_team2, "role"));

  res.render("playing-11", {
    result: result,
    teamrole1: teamrole1,
    teamrole2: teamrole2,
    team1: team1,
    team2: team2,
    matchid: matchid,
    user: name ? name : "",
    title: "Playing 11",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userview_player_by_id_get = async (req, res, next) => {
  let destUrl = helper.objectToQueryString(req.query).replace("dest=", "");
  let teamsList = await axios.get(process.env.API_ENDPOINT + "fetch_teams_details", {});
  const resp = await axios.get(
    process.env.API_ENDPOINT + "fetch_mymatch_player_by_id",
    {
      params: {
        matchid: req.params.matchid,
        id: req.params.id,
      },
    }
  );
  let response = _.get(resp, ["data", "data", "0", "players", "0"]);
  res.render("userview-player-edit", {
    data: response,
    matchid: req.params.matchid,
    destUrl: destUrl,
    teamsList: teamsList.data.data || [],
    user: req.cookies ? req.cookies.name : "",
    title: "User View Edit Player",
  });
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const userview_update_player_by_id_post = async (req, res, next) => {
  const resp = await axios.post(
    process.env.API_ENDPOINT + "update_mymatch_player_by_id",
    {
      params: {
        matchid: req.params.matchid,
        id: req.body.id,
        name: req.body.name,
        role: req.body.role,
        picture: req.body.picture,
        team: req.body.team,
        credits: parseFloat(req.body.credits),
        status: req.body.status || "inactive",
        star: req.body.star || "inactive",
        captain: req.body.captain || "inactive",
        vcaptain: req.body.vcaptain || "inactive",
        destUrl: req.body.destUrl || "",
      },
    }
  );
  req.flash(
    "success",
    `<strong>${req.body.name}</strong> details updated Successfully!`
  );
  res.redirect(resp.data.destUrl);
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const prediction_get = async (req, res, next) => {
  let result = [];
  let selectedCombo = [];
  const combo = config.get("Customer.combo");
  let team1 = req.query.team1;
  let team2 = req.query.team2;
  let matchid = req.query.matchid;
  const playing11 = await axios.get(
    process.env.API_ENDPOINT + "fetch_match_players",
    {
      params: {
        team1: team1,
        team2: team2,
        matchid: matchid,
      },
    }
  );
  let response = _.get(playing11, ["data", "data", "0", "players"]);
  let response_filtered = _.filter(response, {
    status: "active",
  });
  if (response_filtered) {
    result = helper.groupByKey(response_filtered, "role");
    for (var key in combo) {
      let rr = combo[key]["0"].split(",").map((item) => item.trim());
      let cwk = result.hasOwnProperty("WK") && result.WK.length >= rr[0];
      let cbat = result.hasOwnProperty("BAT") && result.BAT.length >= rr[1];
      let car = result.hasOwnProperty("AR") && result.AR.length >= rr[2];
      let cbowl = result.hasOwnProperty("BOWL") && result.BOWL.length >= rr[3];
      if (cwk && cbat && car && cbowl) {
        selectedCombo.push(rr);
      }
    }
  }

  let roles = ['wk', 'bat', 'ar', 'bowl'];
  res.render("prediction", {
    team1: team1,
    team2: team2,
    matchid: matchid,
    roles: roles,
    selectedCombo: selectedCombo,
    user: req.cookies ? req.cookies.name : "",
    title: "Prediction",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const captains_form_get = async (req, res, next) => {
  let result = [];
  let teamrole1 = [];
  let teamrole2 = [];
  let team1 = req.query.team1;
  let team2 = req.query.team2;
  let matchid = req.query.matchid;
  const myplaying11 = await axios.get(
    process.env.API_ENDPOINT + "fetch_match_players",
    {
      params: {
        matchid: matchid,
        team1: team1,
        team2: team2,
      },
    }
  );
  const captains = await axios.get(
    process.env.API_ENDPOINT + "fetch_mymatch_captains",
    {
      params: {
        matchid: matchid,
        team1: team1,
        team2: team2,
      },
    }
  );
  let response = _.get(myplaying11, ["data", "data", "0", "players"]);
  let response_filtered = _.filter(response, {
    status: "active",
  });
  if (response_filtered) {
    result.push(helper.groupByKey(response_filtered, "team"));
  }

  let get_team1 = _.get(result, ["0", team1]);
  let get_team2 = _.get(result, ["0", team2]);

  teamrole1.push(_.groupBy(get_team1, "role"));
  teamrole2.push(_.groupBy(get_team2, "role"));

  res.render("captain", {
    result: result || [],
    teamrole1: teamrole1,
    teamrole2: teamrole2,
    matchid: matchid,
    team1: team1,
    team2: team2,
    captain: captains.data.data || [],
    user: req.cookies ? req.cookies.name : "",
    title: "Captain",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const captain_post = async (req, res, next) => {
  let result = [];
  let captain = [];

  if (typeof req.body.captain != "undefined") {
    if (req.body.captain.length && Array.isArray(req.body.captain)) {
      for (let inc = 0; inc < req.body.captain.length; inc++) {
        captain.push({
          matchid: req.body.matchid,
          name: req.body.captain[inc],
          captain: "active",
          vcaptain: "inactive",
          teamname: req.body.teamname,
        });
      }
    } else {
      captain.push({
        matchid: req.body.matchid,
        name: req.body.captain,
        captain: "active",
        vcaptain: "inactive",
        teamname: req.body.teamname,
      });
    }
  }
  if (typeof req.body.vcaptain != "undefined") {
    if (req.body.vcaptain.length && Array.isArray(req.body.vcaptain)) {
      for (let inc = 0; inc < req.body.vcaptain.length; inc++) {
        captain.push({
          matchid: req.body.matchid,
          name: req.body.vcaptain[inc],
          captain: "inactive",
          vcaptain: "active",
          teamname: req.body.teamname,
        });
      }
    } else {
      captain.push({
        matchid: req.body.matchid,
        name: req.body.vcaptain,
        captain: "inactive",
        vcaptain: "active",
        teamname: req.body.teamname,
      });
    }
  }

  const playing11 = await axios.post(
    process.env.API_ENDPOINT + "savecaptain",
    {
      params: {
        results: captain,
        matchid: req.body.matchid,
        teamname: req.body.teamname,
      },
    }
  );
  res
    .status(200)
    .redirect(
      "/captain?team1=" +
      req.body.team1 +
      "&team2=" +
      req.body.team2 +
      "&matchid=" +
      req.body.matchid
    );
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login_get = async (req, res, next) => {
  res.render("login", {
    mail: req.user || "",
    title: "Login",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const register_form_get = (req, res, next) => {
  res.render("register", {
    mail: req.user ? req.user.email : "",
    title: "Register",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const register_add_post = async (req, res, next) => {
  // Get user input
  const { name, email, pass } = req.body;
  if (!(email && pass && name)) {
    req.flash("error", "All input is required");
    res.status(400).redirect("/register");
    return false;
  }
  // Validate user input
  try {
    const resp = await axios.post(process.env.API_ENDPOINT + "register", {
      params: {
        name: name,
        email: email,
        password: pass,
      },
    });
    req.flash("success", "User register successfully");
  } catch (err) {
    req.flash("error", err.response.data);
  }
  res.status(200).redirect("/register");
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const login_post = async (req, res, next) => {
  const { email, pass } = req.body;
  if (!(email && pass)) {
    req.flash("error", "All input is required");
    res.status(200).redirect("/login");
    return false;
  }
  try {
    const resp = await axios.post(process.env.API_ENDPOINT + "login", {
      params: {
        email: email,
        password: pass,
      },
    });
    res.cookie("jwt", resp.data.token, {
      secure: true,
      httpOnly: true,
    });
    res.cookie("name", resp.data.name, {
      secure: true,
      httpOnly: true,
    });
    res.cookie("user_id", resp.data.user_id, {
      secure: true,
      httpOnly: true,
    });
    req.flash(
      "success",
      `<strong>${resp.data.name.toUpperCase()}</strong> logged-in successfully!`
    );
  } catch (err) {
    console.error(err);
    req.flash("error", err.response.data);
    res.status(200).redirect("/login");
    return false;
  }
  res.status(200).redirect("/home");
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const points_update_my_matches_get = async (req, res, next) => {

  let matchid = req.query.matchid;

  const count = await axios.get(
    process.env.API_ENDPOINT + "dreamteam_count",
    {
      params: {
        matchid: matchid,
      },
    }
  );

  const playersList = await axios.get(
    process.env.API_ENDPOINT + "dreamteam_pointsupdate_by_matchid",
    {
      params: {
        matchid: matchid,
      },
    }
  );

  let response_filtered = _.get(playersList, ["data", "data"]);

  await helper.createPlayerPointsJson({matchid, response_filtered});

  res.render("points-update", {
    team1: req.query.team1,
    team2: req.query.team2,
    matchid: req.query.matchid,
    teamcount: _.get(count, ["data", "data"]),
    playersList: response_filtered || {},
    user: req.cookies ? req.cookies.name : "",
    title: "Update Points",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const my_matches_get = async (req, res, next) => {

  const matchList = await axios.get(
    process.env.API_ENDPOINT + "fetch_mymatches",
    {
      params: {
        user_id: req.cookies ? req.cookies.user_id : "",
        show: req.query.show || 'none',
      },
    }
  );
  // const matchList = await axios.get(process.env.API_ENDPOINT + '/result/:matchid', {});
  res.render("mymatches", {
    matchList: matchList.data.data || [],
    team1: req.query.team1,
    team2: req.query.team2,
    user: req.cookies ? req.cookies.name : "",
    title: "My Matches",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update_points_post = async (req, res, next) => {
  const { team1, team2, matchid } = req.body;
  const points = await axios.post(process.env.API_ENDPOINT + "updatepoints", {
    params: {
      players: req.body,
      matchid: matchid,
    },
  });

  const pstatus = await axios.post(
    process.env.API_ENDPOINT + "update_match_status",
    {
      params: {
        status: "C",
        matchid: matchid,
      },
    }
  );
  req.flash("success", "Points updated successfully");
  res
    .status(200)
    .redirect(
      "/result?team1=" + team1 + "&team2=" + team2 + "&matchid=" + matchid
    );
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const my_matches_delete_get = async (req, res, next) => {
  let result = [];
  const deletemymatch = await axios.get(
    process.env.API_ENDPOINT + "delete_mymatches",
    {
      params: {
        matchid: req.query.matchid,
      },
    }
  );
  const deletemycaptains = await axios.get(
    process.env.API_ENDPOINT + "deletemycaptains",
    {
      params: {
        matchid: req.query.matchid,
      },
    }
  );
  const deletemydreamteam = await axios.get(
    process.env.API_ENDPOINT + "deletemydreamteam",
    {
      params: {
        matchid: req.query.matchid,
      },
    }
  );
  req.flash(
    "success",
    `Match <b>${req.query.matchid}</b> deleted successfully!`
  );
  res.status(200).redirect("/mymatches");
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const result_get = async (req, res, next) => {
  let result = [];
  let mockresult = [];

  const dreamTeam = await axios.get(
    process.env.API_ENDPOINT + "fetchp_created_dreamteam",
    {
      params: {
        matchid: req.query.matchid,
      },
    }
  );

  for (let inc = 0; inc < dreamTeam.data.data.length; inc++) {
    mockresult.push(
      _.orderBy(dreamTeam.data.data[inc].players, ["points"], ["desc"])
    );
  }

  mockresult.forEach(function (team, index) {
    result.push(helper.groupByKey(team, "role"));
  });
  if (0 != result.length) {
    req.flash("success", `<b>${result.length}</b> teams &#128525;!`);
  }
  res.render("result", {
    multiteams: result || [],
    team1: req.query.team1,
    team2: req.query.team2,
    matchid: req.query.matchid,
    user: req.cookies ? req.cookies.name : "",
    title: "Result",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const analytics_get = async (req, res, next) => {
  const analyticsTeam = await axios.get(
    process.env.API_ENDPOINT + "fetchplayersanalytics",
    {
      params: {
        matchid: req.params.matchid,
      },
    }
  );
  let filterresult = _.get(analyticsTeam, ["data", "res"]);
  res.render("analytics", {
    analyticsTeam: filterresult || [],
    team1: req.query.team1,
    team2: req.query.team2,
    matchid: req.query.matchid,
    user: req.cookies ? req.cookies.name : "",
    title: "Analytics",
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const team_details_get = async (req, res) => {
  let result = [];
  const teamdetails = await axios.get(
    process.env.API_ENDPOINT + "fetchteamdetails",
    {
      params: {
        teamid: req.params.teamid,
      },
    }
  );

  let response = _.get(teamdetails, ["data", "res", "players"]);
  let gbyres = _.groupBy(response, "role");
  let gbyteam = _.groupBy(response, "team");
  result.push(gbyres);
  const keys = Object.keys(gbyteam);

  res.render("teamdetails", {
    multiteams: result,
    team1: keys["0"],
    team2: keys["1"],
    user: req.cookies ? req.cookies.name : "",
    title: "Team Details",
  });
};

//export controller functions
module.exports = {
  login_get,
  login_post,
  playing11_get,
  userview_player_by_id_get,
  userview_update_player_by_id_post,
  captains_form_get,
  captain_post,
  prediction_get,
  register_form_get,
  register_add_post,
  my_matches_get,
  points_update_my_matches_get,
  update_points_post,
  my_matches_delete_get,
  result_get,
  analytics_get,
  team_details_get,
};
