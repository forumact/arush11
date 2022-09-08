const axios = require("axios");
var helper = require("../helpers/index");
var dreamTeamServices = require("../utlis/dream-team-utils");
var _ = require("lodash");
const { body, validationResult } = require("express-validator");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const dreamteam_get = async (req, res, next) => {
  var errors = validationResult(req).array();
  if (errors.length) {
    let sendError = "";
    errors.forEach((error, index) => {
      sendError += index + "." + error.msg + "<br>";
    });
    req.flash("error", sendError);
    res.redirect(req.headers.referer);
  } else {
    const result = [];

    let combo = await helper.filterCombo(req.query);
    let partition = await helper.filterPartition(req.query);
    let passdata = await helper.preparePassData(req.cookies, req.query, combo, partition);

    const dreamTeam = await axios.get(
      process.env.API_ENDPOINT + "fetch_match_players",
      {
        params: {
          matchid: passdata.matchid,
          team1: passdata.team1,
          team2: passdata.team2,
        },
      }
    );
    let response = _.get(dreamTeam, ["data", "data", "0", "players"]);
    let response_filtered = _.filter(response, {
      status: "active",
    });

    const captains = await axios.get(
      process.env.API_ENDPOINT + "fetch_mymatch_captains",
      {
        params: {
          matchid: passdata.matchid,
          team1: passdata.team1,
          team2: passdata.team2,
        },
      }
    );

    const deleteddreamteam = await axios.post(
      process.env.API_ENDPOINT + "delete_dreamteam",
      {
        params: {
          matchid: passdata.matchid
        },
      }
    );

    // let deleteMany = await DreamTeam.deleteMany({ matchid: matchid });

    if (dreamTeam) {
      let teams = await dreamTeamServices.dreamTeamGener(
        response_filtered,
        passdata,
        captains.data
      );
      teams.forEach(function (team, index) {
        result.push(helper.groupByKey(team, "role"));
      });


      let pitchreport = await axios.post(
        process.env.API_ENDPOINT + "update_pitchreport",
        {
          params: {
            matchid: passdata.matchid,
            user_id: passdata.userid,
            team1: passdata.team1,
            team2: passdata.team2,
            pr: passdata.pr,
            wp: passdata.wp,
            vcp: passdata.vcp,
            teamcount: teams.length, 
          },
        }
      );

      if (0 != teams.length) {
        req.flash(
          "success",
          `<b>${teams.length}</b> teams created successfully &#128525;!`
        );
      }
      if (passdata.nt != teams.length) {
        req.flash(
          "warning",
          `Software is short for selected team combinations &#128533;!`
        );
      }
      res.render("dreamteam", {
        multiteams: result,
        team1: passdata.team1,
        team2: passdata.team2,
        user: req.cookies ? req.cookies.name : "",
        message: {
          success: req.flash("success"),
          warning: req.flash("warning"),
        },
        title: "Deam Team",
      });
    }
  }
};


//export controller functions
module.exports = {
  dreamteam_get,
};
