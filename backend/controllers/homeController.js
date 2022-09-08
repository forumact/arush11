const axios = require("axios");
const config = require("config");
var helper = require("../helpers/index");
// var dreamTeamServices = require("../services/dreamTeamServices");
// const DreamTeam = require("../models/RA11_DreamTeam");
var _ = require("lodash");
const { body, validationResult } = require("express-validator");
const instance = axios.create({
  withCredentials: true,
});

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const home_get = async (req, res) => {
  res.render("home", {
    welcomeMessage: "welcomeMessage",
    user: req.cookies ? req.cookies.name : "",
    title: "Home",
  });
};


//export controller functions
module.exports = {
  home_get,
};
