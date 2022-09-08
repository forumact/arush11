const express = require("express"); //import express
const validation = require('../validation/index');
const {auth} = require("../middleware/auth");

// 1.
const router = express.Router();
// 2.
const frontendController = require("../controllers/frontendController");
const homeController = require("../controllers/homeController");
const seriesController = require("../controllers/seriesController");
const squadController = require("../controllers/squadController");
const dreamteamController = require("../controllers/dreamteamController");
// 3. Get router
router.get("/", homeController.home_get);
router.get("/home", auth, homeController.home_get);
router.get("/series", auth, seriesController.series_get);
router.get("/squads", auth, squadController.squads_get);
router.get("/player/:matchid/:id/edit", auth, frontendController.userview_player_by_id_get);
router.get("/playing-11", auth, frontendController.playing11_get);
router.get("/captain", auth, frontendController.captains_form_get);
router.get("/prediction", auth, frontendController.prediction_get);
router.get("/dreamteam", auth, validation.partitionValidation, dreamteamController.dreamteam_get);
router.get("/login", frontendController.login_get);
router.get("/register", frontendController.register_form_get);
router.get("/mymatches", auth, frontendController.my_matches_get);
router.get("/points_update/:matchid", auth, frontendController.points_update_my_matches_get);
router.get("/delete_mymatches", auth, frontendController.my_matches_delete_get);
router.get("/result", auth, frontendController.result_get);
router.get("/analytics/:matchid", auth, frontendController.analytics_get);
router.get("/dreamteam/:teamid", auth, frontendController.team_details_get);

// 4. Get router
router.post("/login", frontendController.login_post);
router.post("/register", frontendController.register_add_post);
router.post("/player/:matchid/:id/update", frontendController.userview_update_player_by_id_post);
router.post("/captain/save", auth, frontendController.captain_post);
router.post("/updatepoints", auth, frontendController.update_points_post);

// 5. export to use in server.js
module.exports = router;
