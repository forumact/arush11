const express = require("express"); //import express

// 1.
const router = express.Router();
// 2.
const apiController = require("../controllers/testapiController");
// 3. API Get Methods

// router.get("/apitestapi", apiController.api_test_api_get);
router.get("/pullscore", apiController.api_pull_score_get);
router.get("/pullsquad", apiController.api_pull_squad_get);

module.exports = router; // export to use in server.js