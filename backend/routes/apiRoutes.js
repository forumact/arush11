const express = require("express"); //import express

// 1.
const router = express.Router();
// 2.
const apiController = require("../controllers/apiController");
const userApi = require('../api/userApi');
const seriesApi = require('../api/seriesApi');
const teamsApi = require('../api/teamsApi');
const captainApi = require('../api/captainsApi');
const playersApi = require('../api/playersApi');
const dreamteamApi = require('../api/dreamteamsApi');

// 3. API Get Methods
router.get("/fetch_tournaments_details", seriesApi.fetch_tournaments_details_api_get);
router.get("/fetch_tournaments_by_id", seriesApi.fetch_tournaments_by_id_api_get);

router.get("/fetch_teams_details", seriesApi.fetch_teams_details_api_get);
router.get("/fetch_team_by_id", seriesApi.fetch_team_by_id_api_get);
router.get("/fetch_all_players", playersApi.fetch_all_players_api_get);
router.get("/fetch_player_by_id", playersApi.fetch_player_by_id_api_get);
router.get("/fetch_mymatch_player_by_id", teamsApi.fetch_mymatch_player_by_id_api_get);
router.get("/fetch_players_by_team", teamsApi.fetch_players_by_team_api_get);
router.get("/fetch_mymatch_captains", captainApi.fetch_mymatch_captains_api_get);
router.get("/fetch_mymatches", teamsApi.fetch_my_matches_api_get);
router.get("/fetch_match_players", teamsApi.fetch_match_players_api_get);
router.get("/logout", userApi.logout_api_get);
router.get("/fetchp_created_dreamteam", dreamteamApi.fetchp_created_dreamteam_api_get);
router.get("/dreamteam_pointsupdate_by_matchid", dreamteamApi.dreamteam_pointsupdate_by_matchid_api_get);

// router.get("/fetchplayersanalytics", apiController.fetch_players_analytics_api_get);
router.get("/delete_mymatches", teamsApi.delete_my_matches_api_get);
// router.get("/deletemycaptains", apiController.delete_my_captains_api_get);
// router.get("/deletemydreamteam", apiController.delete_my_dream_team_api_get);
router.get("/fetch_users", userApi.fetch_users_api_get);
router.get("/fetch_users_by_id", userApi.fetch_users_by_id_api_get);

// router.get("/fetchteamdetails", apiController.fetch_teamdetails_api_get);
router.get("/dreamteam_count", dreamteamApi.dream_team_count_api_get);

// router.get("/testapi", apiController.test_api_get);

// API Post Methods
router.post("/login", userApi.login_post);
router.post("/update_player_by_id", playersApi.update_player_by_id_api_post);
router.post("/update_mymatch_player_by_id", teamsApi.userview_update_player_by_id_api_post);
router.post("/delete_player_by_id", playersApi.delete_player_by_id_api_post);
router.post("/add_player", playersApi.add_player_api_post);
router.post("/addtournament", seriesApi.add_tournament_api_post);
router.post("/addteam", seriesApi.add_team_api_post);
router.post("/savecaptain", captainApi.save_captain_api_post);
router.post("/register", userApi.register_api_post);
router.post("/updatepoints", dreamteamApi.update_points_api_post);
router.post("/create_mymatch", teamsApi.create_my_match_api_post);
router.post("/update_pitchreport", teamsApi.update_pitch_report_api_post);
router.post("/update_match_status", teamsApi.update_match_status_api_post);
router.post("/people_update", userApi.people_update_api_post);

router.post("/create_dreamteam", dreamteamApi.create_dreamteam_api_post);
router.post("/save_dreamteam", dreamteamApi.save_dreamteam_api_post);
router.post("/delete_dreamteam", dreamteamApi.delete_dreamteam_api_post);

//API Delete Methods

router.delete("/deletetournament", seriesApi.delete_tournament_api_delete);
router.delete("/delete_team", seriesApi.delete_team_api_post);
router.delete("/people_delete", userApi.people_delete_api_post);

module.exports = router; // export to use in server.js