const express = require("express"); //import express
const validation = require('../validation/index');
const {
  auth,
  authadmin
} = require("../middleware/auth");
// 1.
const router = express.Router();
// 2.
const backendController = require("../controllers/backendController");
const userController = require("../controllers/UserController");
const userApi = require('../api/userApi');

// 3. Get router
router.get("/players/:team?", authadmin, backendController.players_get);
router.get("/player/:id/edit", authadmin, backendController.player_by_id_get);
router.get("/player/:id/delete", authadmin, backendController.delete_player_by_id_get);
router.get("/player/add", authadmin, backendController.add_player_get);
router.get("/tournament/:tournament_id?", authadmin, backendController.tournament_get);
router.get("/team/:team_id?", authadmin, backendController.team_get);
router.get("/people/:user_id?", authadmin, userController.people_get);
// 4. Post router
router.post("/player/:id/update", authadmin, backendController.update_player_by_id_post);
router.post("/player/add", authadmin, backendController.add_player_post);
router.post("/tournament", authadmin, backendController.tournament_post);
router.post("/team/update", authadmin, backendController.team_post);
router.post("/people/update", authadmin, userController.people_post);
// 5. Delete router
router.get("/tournament/delete/:id", authadmin, backendController.tournament_delete_get);
router.get("/team/delete/:id", authadmin, backendController.team_delete_get);
router.get("/people/delete/:id", authadmin, userController.people_delete_get);
// 5. export to use in server.js
module.exports = router;