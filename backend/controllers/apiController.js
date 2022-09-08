// var Player = require("../models/RA11_Player");
// var Captain = require("../models/RA11_Captain");
// var Tournament = require("../models/RA11_Tournament");
// var Team = require("../models/RA11_Team");
// // var User = require("../models/RA11_User");
// var DreamTeam = require("../models/RA11_DreamTeam");
// var MyMatch = require("../models/RA11_MyMatch");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_tournaments_api_get = (req, res, next) => {
//   let tournaments = [];
//   let filter = {};
//   if (req.query.tournament_name) {
//     filter = {
//       tournament_name: req.query.tournament_name,
//     };
//   } else if (req.query.status) {
//     filter = {
//       status: req.query.status,
//     };
//   }
//   tournaments = Tournament.find(
//     filter,
//     null,
//     {
//       limit: 25,
//       sort: {
//         name: 1, //Sort by Date Added DESC
//       },
//     },
//     function (error, tournaments) {
//       if (!error) {
//         res.send({
//           status: 200,
//           data: tournaments,
//         });
//       } else {
//         console.error(`${error} while finding from post collection`);
//       }
//     }
//   );
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_teams_api_get = (req, res, next) => {
//   let tournaments = [];

//   let filter = {};
//   if (req.query.tournament_name) {
//     filter = {
//       tournament_name: req.query.tournament_name,
//     };
//   } else if (req.query.status) {
//     filter = {
//       status: req.query.status,
//     };
//   }

//   // const filter = req.query.tournament_name
//   //   ? {
//   //       tournament_name: req.query.tournament_name,
//   //     }
//   //   : {status: req.query.status,};
//   teams = Team.find(
//     filter,
//     null,
//     {
//       limit: 25,
//       sort: {
//         name: 1, //Sort by Date Added DESC
//       },
//     },
//     function (error, teams) {
//       if (!error) {
//         res.send({
//           status: 200,
//           data: teams,
//         });
//       } else {
//         console.error(`${error} while finding from post collection`);
//       }
//     }
//   );
// };
// //GET '/home'
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_all_players_api_get = (req, res, next) => {
//   let players = [];
//   const filter = req.query.team
//     ? {
//       team: req.query.team,
//     }
//     : {};
//   players = Player.find(
//     filter,
//     null,
//     {
//       limit: 25,
//       sort: {
//         role: 1, //Sort by Date Added DESC
//       },
//     },
//     function (error, players) {
//       if (!error) {
//         res.send({
//           status: 200,
//           data: players,
//         });
//       } else {
//         console.error(`${error} while finding from post collection`);
//       }
//     }
//   );
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_player_by_id_api_get = (req, res, next) => {
//   let player = [];
//   player = Player.findById(req.query.id, (err, docs) => {
//     if (!err) {
//       res.send({
//         status: 200,
//         data: docs,
//       });
//     } else {
//       console.error("Error in retrieving users list :" + err);
//     }
//   });
// };
// const fetch_mymatch_player_by_id_api_get = (req, res, next) => {
//   let player = [];
//   player = MyMatch.find(
//     {
//       matchid: req.query.matchid,
//       players: {
//         $elemMatch: {
//           _id: req.query.id,
//         },
//       },
//     },
//     {
//       "players.$": 1,
//     },
//     (err, docs) => {
//       if (!err) {
//         res.send({
//           status: 200,
//           data: docs,
//         });
//       } else {
//         console.error("Error in retrieving users list :" + err);
//       }
//     }
//   );
//   // player = Player.findById(req.query.id, (err, docs) => {
//   //     if (!err) {
//   //         res.send({
//   //             status: 200,
//   //             data: docs
//   //         });
//   //     } else {
//   //         console.error('Error in retrieving users list :' + err);
//   //     }
//   // });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const update_player_by_id_api_post = (req, res, next) => {
//   const filter = {
//     _id: req.body.params.id,
//   };
//   Player.updateOne(
//     filter,
//     {
//       name: req.body.params.name,
//       role: req.body.params.role,
//       picture: req.body.params.picture,
//       team: req.body.params.team,
//       credits: req.body.params.credits,
//       status: req.body.params.status,
//       star: req.body.params.star,
//     },
//     function (err, user) {
//       if (!err) {
//         res.send({
//           status: 200,
//           data: user,
//           destUrl: req.body.params.destUrl,
//         });
//       } else {
//         console.error("Error in retrieving users list :" + err);
//       }
//     }
//   );
// };
// const userview_update_player_by_id_api_post = async (req, res, next) => {
//   const {
//     matchid,
//     id,
//     name,
//     role,
//     picture,
//     team,
//     credits,
//     status,
//     star,
//     destUrl,
//   } = req.body.params;
//   let matchupdate = await MyMatch.updateOne(
//     {
//       matchid: matchid,
//       "players._id": id,
//     }, // Query parameter
//     {
//       $set: {
//         "players.$.name": name,
//         "players.$.role": role,
//         "players.$.picture": picture,
//         "players.$.team": team,
//         "players.$.credits": credits,
//         "players.$.status": status,
//         "players.$.star": star,
//       },
//     }, // Replacement document
//     {}
//   );
//   res.send({
//     status: 200,
//     destUrl: destUrl,
//   });
//   // res.status(200).send("My Match player details updated");
//   // try {
//   //     let updates = MyMatch.updateOne(
//   //         // query
//   //         {
//   //             "matchid": matchid,
//   //             "players._id": id,
//   //         },
//   //         // update
//   //         {
//   //             $set: {
//   //                 "players.$.name": name,
//   //                 "players.$.role": role,
//   //                 "players.$.picture": picture,
//   //                 "players.$.team": team,
//   //                 "players.$.credits": credits,
//   //                 "players.$.status": status,
//   //                 "players.$.star": star,
//   //             }
//   //         },
//   //         // Update options (Optional)
//   //         {});
//   //     return res.status(500).send({
//   //         'msg': 'Player Updated'
//   //     });
//   // } catch (err) {
//   //     console.error(err);
//   // }
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const add_player_api_post = (req, res, next) => {
//   Player.create(
//     {
//       name: req.body.params.name,
//       role: req.body.params.role,
//       picture: req.body.params.picture,
//       team: req.body.params.team,
//       credits: req.body.params.credits,
//       status: req.body.params.status || "inactive",
//       star: req.body.params.star || "inactive",
//     },
//     function (err, user) {
//       if (err)
//         return res.status(500).send({
//           error: error,
//         });
//       res.status(200).redirect("/admin/player/add");
//     }
//   );
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const delete_player_by_id_api_post = (req, res, next) => {
//   Player.findByIdAndRemove(req.body.params.id, function (err) {
//     if (err) {
//       return res.status(500).send({
//         error: error,
//       });
//     } else {
//       res.status(200).redirect("/admin/players");
//     }
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const add_tournament_api_post = async (req, res, next) => {
//   const filter = req.body.params.machine_name
//     ? {
//       machine_name: req.body.params.machine_name,
//     }
//     : {};
//   let tupdate = await Tournament.updateOne(
//     filter,
//     {
//       name: req.body.params.name,
//       machine_name: req.body.params.machine_name,
//       status: req.body.params.status || "inactive",
//     },
//     {
//       upsert: true,
//     }
//   );
//   return res.status(500).send({
//     msg: "Updated",
//   });
// };
// const delete_tournament_api_delete = async (req, res, next) => {
//   const filter = req.query.id
//     ? {
//       _id: req.query.id,
//     }
//     : {};
//   let tupdate = await Tournament.deleteOne({
//     _id: req.query.id,
//   });
//   return res.status(500).send({
//     msg: "Updated",
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const add_team_api_post = async (req, res, next) => {
//   const filter = req.body.params.teamname
//     ? {
//       teamname: req.body.params.teamname,
//     }
//     : {};
//   let tupdate = await Team.updateOne(
//     filter,
//     {
//       tournament_name: req.body.params.tournament_name,
//       teamname: req.body.params.teamname,
//       status: req.body.params.status || "inactive",
//     },
//     {
//       upsert: true,
//     }
//   );
//   res.status(200).redirect("/admin/team");
//   // Team.create({
//   //     tournament_name: req.body.params.tournament_name,
//   //     teamname: req.body.params.teamname,
//   //     status: req.body.params.status || 'inactive',
//   // }, function(err, user) {
//   //     if (err) return res.status(500).send({
//   //         'error': error
//   //     });
//   //     res.status(200).redirect('/admin/team/add');
//   // });
// };
// const delete_team_api_post = async (req, res, next) => {
//   let tupdate = await Team.deleteOne({
//     _id: req.query.id,
//   });
//   return res.status(500).send({
//     msg: "Team deleted",
//   });
// };
// const people_delete_api_post = async (req, res, next) => {
//   let tupdate = await User.deleteOne({
//     _id: req.query.id,
//   });
//   return res.status(500).send({
//     msg: "People deleted",
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_team_players_api_get = (req, res, next) => {
//   const result = [];
//   const filter = {
//     team: {
//       $in: [req.query.team1, req.query.team2],
//     },
//     status: {
//       $in: [req.query.status1, req.query.status2],
//     },
//   };
//   Player.find(
//     filter,
//     null,
//     {
//       sort: {
//         role: 1, //Sort by Date Added DESC
//       },
//     },
//     (err, docs) => {
//       if (!err) {
//         res.send({
//           status: 200,
//           data: docs,
//         });
//       } else {
//         console.error("Error in retrieving Deam Team:" + err);
//       }
//     }
//   );
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const save_prediction_api_post = async (req, res, next) => {
//   try {
//     let capdelete = await Captain.deleteMany({
//       matchid: req.body.params.matchid,
//       teamname: req.body.params.teamname,
//     });
//     let capinsert = await Captain.insertMany(req.body.params.results);
//     return res.status(200).redirect("/prediction?team1=KKR&team2=LSG");
//   } catch (err) {
//     console.error(err);
//   }
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_my_captains_api_get = (req, res, next) => {
//   const result = [];
//   const filter = {
//     matchid: req.query.matchid,
//   };
//   Captain.find(filter, (err, docs) => {
//     if (!err) {
//       res.send({
//         status: 200,
//         data: docs,
//       });
//     } else {
//       console.error("Error in retrieving Deam Team:" + err);
//     }
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const register_api_post = async (req, res, next) => {
//   try {
//     // Get user input
//     const { name, email, password } = req.body.params;
//     // check if user already exist
//     // Validate if user exist in our database
//     const oldUser = await User.findOne({
//       email,
//     });
//     if (oldUser) {
//       return res.status(409).send("User Already Exist. Please Login");
//     }
//     //Encrypt user password
//     encryptedPassword = await bcrypt.hash(password, 10);
//     const user = User.create({
//       name: name,
//       email: email.toLowerCase(), // sanitize: convert email to lowercase,
//       password: encryptedPassword,
//     });
//     // Create token
//     const token = jwt.sign(
//       {
//         user_id: user._id,
//         email,
//       },
//       process.env.JWT_KEY,
//       {
//         expiresIn: "2h",
//       }
//     );
//     // save user token
//     user.token = token;
//     res.status(201).json(user);
//   } catch (err) {
//     console.error(err);
//   }
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const login_post = async (req, res, next) => {
//   try {
//     // Get user input
//     const { email, password } = req.body.params;
//     // Validate user input
//     if (!(email && password)) {
//       res.status(400).send("All input is required");
//       return false;
//     }
//     // Validate if user exist in our database
//     const user = await User.findOne({
//       email: email,
//       status: "A",
//     });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       // Create token
//       const token = jwt.sign(
//         {
//           user_id: user._id,
//           email: email,
//           name: user.name,
//           role: user.role,
//         },
//         process.env.JWT_KEY,
//         {
//           expiresIn: "2d",
//         }
//       );
//       // save user token
//       user.token = token;
//       // user
//       // return new user
//       res.status(200).send({
//         token: token,
//         name: user.name,
//         user_id: user._id,
//       });
//       return false;
//     }
//     res.status(400).send("Invalid Username or Credentials");
//   } catch (err) {
//     console.error(err);
//   }
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const logout_api_get = async (req, res, next) => {
//   res.clearCookie("jwt");
//   res.clearCookie("name");
//   res.clearCookie("user_id");
//   res.redirect("/login");
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_my_matches_api_get = async (req, res, next) => {
//   const filter = (req.query.user_id && req.query.show !== 'all')
//     ? {
//       userid: req.query.user_id,
//     }
//     : {};

//   let mymatches = await MyMatch.find(filter, null, {
//     limit: 25,
//   });
//   res.send({
//     status: 200,
//     data: mymatches,
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_my_match_players_api_get = async (req, res, next) => {
//   let result = await MyMatch.find(
//     {
//       matchid: req.query.matchid,
//     },
//     {
//       players: 1,
//     }
//   ).sort({
//     players: -1,
//   });
//   res.send({
//     status: 200,
//     data: result,
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_match_players_list_api_get = async (req, res, next) => {
//   let result = await DreamTeam.aggregate([
//     {
//       $match: {
//         matchid: req.query.matchid,
//       },
//     },
//     {
//       $unwind: "$players",
//     },
//     {
//       $group: {
//         _id: "$players.name",
//         count: {
//           $sum: 1,
//         },
//         fields: {
//           $addToSet: {
//             points: "$players.points",
//             role: "$players.role",
//             team: "$players.team",
//           },
//         },
//       },
//     },
//     {
//       $sort: {
//         _id: 1,
//       },
//     },
//   ]);
//   res.status(200).send({
//     res: result,
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const fetch_players_final_api_get = async (req, res, next) => {
//   let playersFinal = await DreamTeam.aggregate([
//     {
//       $match: {
//         matchid: req.query.matchid,
//       },
//     },
//     {
//       $unwind: "$players",
//     },
//     {
//       $group: {
//         _id: "$_id",
//         teamnumber: {
//           $first: "$players.teamnumber",
//         },
//         Total1: {
//           $sum: {
//             $switch: {
//               branches: [
//                 {
//                   case: {
//                     $eq: ["$players.captain", "active"],
//                   },
//                   then: {
//                     $multiply: ["$players.points", 2],
//                   },
//                 },
//                 {
//                   case: {
//                     $eq: ["$players.vcaptain", "active"],
//                   },
//                   then: {
//                     $multiply: ["$players.points", 1.5],
//                   },
//                 },
//               ],
//               default: "$players.points",
//             },
//           },
//         },
//         players: {
//           $addToSet: "$players",
//         },
//       },
//     },
//     {
//       $sort: {
//         Total1: -1,
//         teamnumber: 1
//       },
//     },
//   ]);
//   res.status(200).send({
//     res: playersFinal,
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const update_points_api_post = async (req, res, next) => {
//   let players = req.body.params.players;
//   let { matchid } = req.body.params.players;
//   for (let [index, [playername, playerpoints]] of Object.entries(
//     Object.entries(players)
//   )) {
//     let updates = await DreamTeam.updateMany(
//       // query
//       {
//         matchid: matchid,
//         "players.name": playername,
//       },
//       // update
//       {
//         $set: {
//           "players.$.points":
//             playerpoints === null ? 0 : parseFloat(playerpoints),
//         },
//       },
//       // Update options (Optional)
//       {}
//     );
//   }
//   res.status(200).send({
//     res: "Points Updated",
//   });
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const my_match_update_api_post = async (req, res, next) => {
//   try {
//     let matchupdate = await MyMatch.updateOne(
//       //
//       {
//         matchid: req.body.params.matchid,
//       }, // Query parameter
//       {
//         $set: {
//           pitchreport: req.body.params.pr,
//           winningposibility: req.body.params.wp,
//         },
//       },
//       {}
//     );
//     res.status(200).send("My Match Updated or Created");
//   } catch (e) {
//     console.error(e);
//   }
// };
// const update_match_status_api_post = async (req, res, next) => {
//   let matchupdate = await MyMatch.updateOne(
//     {
//       matchid: req.body.params.matchid,
//     }, // Query parameter
//     {
//       status: req.body.params.status,
//     }, // Replacement document
//     {}
//   );
//   res.status(200).send("My Match status");
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const delete_my_matches_api_get = async (req, res, next) => {
//   const matchdelete = await MyMatch.findOneAndDelete({
//     matchid: req.query.matchid,
//   });
//   return res.status(200).send("Match Deleted");
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const delete_my_captains_api_get = async (req, res, next) => {
//   const matchdelete = await Captain.deleteMany({
//     matchid: req.query.matchid,
//   });
//   return res.status(200).send("Captain Deleted");
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const delete_my_dream_team_api_get = async (req, res, next) => {
//   const teamdelete = await DreamTeam.deleteMany({
//     matchid: req.query.matchid,
//   });
//   return res.status(200).send("dream team Deleted");
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const create_my_match_api_post = async (req, res, next) => {
//   try {
//     const oldMatchId = await MyMatch.findOne(
//       {
//         matchid: req.body.params.matchid,
//       },
//       {
//         matchid: 1,
//         _id: 0,
//       }
//     );
//     if (!oldMatchId) {
//       MyMatch.create({
//         matchid: req.body.params.matchid,
//         userid: req.body.params.userid,
//         team1: req.body.params.team1,
//         team2: req.body.params.team2,
//         pitchreport: req.body.params.pitchreport,
//         winningposibility: req.body.params.winningposibility,
//         players: req.body.params.players,
//       });
//     }
//   } catch (err) {
//     console.error(`${err} while finding from post collection`);
//     next(err);
//   }
//   return res.status(200).send("complete");
// };
// const fetch_users_api_get = async (req, res, next) => {
//   let users = await User.find({}, null, {
//     limit: 25,
//     sort: {
//       name: 1,
//     },
//   });
//   res.status(200).send({
//     res: users,
//   });
// };
// /**
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  * @returns
//  */
// const peopleupdate_api_post = async (req, res, next) => {
//   const filter = req.body.params.user_id
//     ? {
//       _id: req.body.params.user_id,
//     }
//     : {};
//   let tupdate = await User.findOneAndUpdate(
//     filter,
//     {
//       name: req.body.params.name,
//       email: req.body.params.email,
//       status: req.body.params.status,
//     },
//     {}
//   );
//   return res.status(200).send("User Updated");
// };
// /**
//  * Returns x raised to the n-th power.
//  *
//  * @param {number} x The number to raise.
//  * @param {number} n The power, must be a natural number.
//  * @return {number} x raised to the n-th power.
//  */
// const test_api_get = async (req, res, next) => {
//   let result = await DreamTeam.aggregate([
//     {
//       $match: {
//         matchid: req.query.matchid,
//       },
//     },
//     {
//       $group: {
//         _id: {
//           player: "$players.name",
//           points: "$players.points",
//         },
//         TotalPoints: {
//           $sum: "$players.points",
//         },
//         Count: {
//           $sum: 1,
//         },
//       },
//     },
//     {
//       $project: {
//         PlayerName: "$_id.player",
//         Points: "$_id.points",
//         Total: "$TotalPoints",
//       },
//     },
//   ]);
//   // let result = await DreamTeam.aggregate(
//   //     [{
//   //         $match: {
//   //             matchid: req.query.matchid
//   //         }
//   //     }, {
//   //         $group: {
//   //             _id: "$players.name",
//   //         }
//   //     }, {
//   //         $sort: {
//   //             _id: 1
//   //         }
//   //     }, {
//   //         "$project": {
//   //             star: 1,
//   //         }
//   //     }, ]);
//   let resu = [];
//   // for (let inc = 0; inc < result.length; inc++) {
//   //     for (let inc1 = 0; inc1 < result[inc]._id.length; inc1++) {
//   //         resu.push(result[inc]._id[inc1]);
//   //     }
//   // }
//   // const count = {};
//   // for (const element of resu) {
//   //     if (count[element]) {
//   //         count[element] += 1;
//   //     } else {
//   //         count[element] = 1;
//   //     }
//   // }
//   res.status(200).send({
//     res: result,
//   });
// };
// /**
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// const fetch_teamdetails_api_get = async (req, res, next) => {
//   let id = req.query.teamid;
//   let teamDetails = await DreamTeam.findById(id).exec();
//   res.status(200).send({
//     res: teamDetails,
//   });
// };

// /**
//  *
//  * @param {*} req
//  * @param {*} res
//  * @param {*} next
//  */
// const fetch_players_analytics_api_get = async (req, res, next) => {
//   let result = await DreamTeam.aggregate([
//     {
//       $match: {
//         matchid: req.query.matchid,
//       },
//     },
//     {
//       $unwind: "$players",
//     },
//     {
//       $group: {
//         _id: "$_id",
//         teamnumber: {
//           $first: "$players.teamnumber",
//         },
//         Total1: {
//           $sum: {
//             $switch: {
//               branches: [
//                 {
//                   case: {
//                     $eq: ["$players.captain", "active"],
//                   },
//                   then: {
//                     $multiply: ["$players.points", 2],
//                   },
//                 },
//                 {
//                   case: {
//                     $eq: ["$players.vcaptain", "active"],
//                   },
//                   then: {
//                     $multiply: ["$players.points", 1.5],
//                   },
//                 },
//               ],
//               default: "$players.points",
//             },
//           },
//         },
//         players: {
//           $addToSet: "$players",
//         },
//       },
//     },
//     {
//       $sort: {
//         Total1: -1,
//       },
//     },
//   ]);
//   res.status(200).send({
//     res: result,
//   });
// };

// const dream_team_count_api_get = async (req, res) => {
//   let result = await DreamTeam.count({ matchid: req.query.matchid });
//   res.status(200).send({
//     res: result,
//   });
// }
// //export controller functions
// module.exports = {
//   fetch_all_players_api_get,
//   fetch_player_by_id_api_get,
//   fetch_mymatch_player_by_id_api_get,
//   update_player_by_id_api_post,
//   userview_update_player_by_id_api_post,
//   add_player_api_post,
//   delete_player_by_id_api_post,
//   add_tournament_api_post,
//   delete_tournament_api_delete,
//   add_team_api_post,
//   delete_team_api_post,
//   people_delete_api_post,
//   fetch_team_players_api_get,
//   save_prediction_api_post,
//   fetch_my_captains_api_get,
//   fetch_tournaments_api_get,
//   fetch_teams_api_get,
//   register_api_post,
//   peopleupdate_api_post,
//   login_post,
//   logout_api_get,
//   fetch_my_matches_api_get,
//   update_match_status_api_post,
//   fetch_match_players_list_api_get,
//   fetch_my_match_players_api_get,
//   fetch_players_final_api_get,
//   update_points_api_post,
//   create_my_match_api_post,
//   my_match_update_api_post,
//   delete_my_matches_api_get,
//   delete_my_captains_api_get,
//   delete_my_dream_team_api_get,
//   fetch_users_api_get,
//   fetch_players_analytics_api_get,
//   fetch_teamdetails_api_get,
//   dream_team_count_api_get,
//   test_api_get,
// };
