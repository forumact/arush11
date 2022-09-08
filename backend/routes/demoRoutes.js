const express = require("express"); //import express

// 1.
const router = express.Router();
// 2.
const demoController = require("../controllers/demoController");

// 3. Get router
router.get("/", demoController.demo_get);


// 5. export to use in server.js
module.exports = router;
