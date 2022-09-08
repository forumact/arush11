const logger = require("../../utlis/logger");
const { DreamteamModel } = require("../models");

//Dealing with data base operations
class DreamTeamRepository {
  async CreateDreamTeam({ dreamTeam }) {
    try {
      const dteam = await DreamteamModel.insertMany(dreamTeam);
      return dteam;
    } catch (err) {
      logger.info(`Unable to save the dreamTeam: ${err}`);
      throw new Error("Unable to Save The Dream Team");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async DeleteDreamTeamByMatchId({ matchid }) {
    try {
      const deletedDreamTeam = await DreamteamModel.deleteMany({
        matchid: matchid,
      });
      return deletedDreamTeam;
    } catch (err) {
      logger.info(`Unable to delete the dreamTeam: ${err}`);
      throw new Error("Unable to Delete The User");
    }
  }

  async PlayerListFromDreamTeamByMatchId({ matchid }) {
    try {
      let players = await DreamteamModel.aggregate([
        {
          $match: {
            matchid: matchid,
          },
        },
        {
          $unwind: "$players",
        },
        {
          $group: {
            _id: "$players.name",
            count: {
              $sum: 1,
            },
            fields: {
              $addToSet: {
                points: "$players.points",
                role: "$players.role",
                team: "$players.team",
              },
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]);
      return players;
    } catch (err) {
      logger.info(`Unable to update the dreamTeam: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }

  async FetchPlayersForResultPage({ matchid }) {
    try {
      let players = await DreamteamModel.aggregate([
        {
          $match: {
            matchid: matchid,
          },
        },
        {
          $unwind: "$players",
        },
        {
          $group: {
            _id: "$_id",
            teamnumber: {
              $first: "$players.teamnumber",
            },
            Total1: {
              $sum: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $eq: ["$players.captain", "active"],
                      },
                      then: {
                        $multiply: ["$players.points", 2],
                      },
                    },
                    {
                      case: {
                        $eq: ["$players.vcaptain", "active"],
                      },
                      then: {
                        $multiply: ["$players.points", 1.5],
                      },
                    },
                  ],
                  default: "$players.points",
                },
              },
            },
            players: {
              $addToSet: "$players",
            },
          },
        },
        {
          $sort: {
            Total1: -1,
            teamnumber: 1,
          },
        },
      ]);
      return players;
    } catch (err) {
      logger.info(`Unable to fetch the dreamTeam: ${err}`);
      throw new Error("Unable to fetch created Dream Team");
    }
  }

  async UpdatePlayerPointsByMatchId({ players, matchid }) {
    try {
      let updates = false;
      console.log('matchid', matchid)
      console.log('players', players)
      for (let [index, [playername, playerpoints]] of Object.entries(
        Object.entries(players)
      )) {
        updates = await DreamteamModel.updateMany(
          // query
          {
            matchid: matchid,
            "players.name": playername,
          },
          // update
          {
            $set: {
              "players.$.points":
                playerpoints === null ? 0 : parseFloat(playerpoints),
            },
          },
          // Update options (Optional)
          {}
        );
      }
      return updates;
    } catch (err) {
      logger.info(`Unable to update the points: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }

  async FetchDreamTeamDetailsById({ id }) {
    try {
      let teamDetails = await DreamteamModel.findById(id);
      return teamDetails;
    } catch (err) {
      logger.info(`Unable to fetcg the dreamTeam: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }

  async FetchCapAndVcap({ matchid }) {
    try {
      let result = await DreamteamModel.aggregate([
        {
          $match: {
            matchid: matchid,
          },
        },
        {
          $unwind: "$players",
        },
        {
          $group: {
            _id: "$_id",
            teamnumber: {
              $first: "$players.teamnumber",
            },
            Total1: {
              $sum: {
                $switch: {
                  branches: [
                    {
                      case: {
                        $eq: ["$players.captain", "active"],
                      },
                      then: {
                        $multiply: ["$players.points", 2],
                      },
                    },
                    {
                      case: {
                        $eq: ["$players.vcaptain", "active"],
                      },
                      then: {
                        $multiply: ["$players.points", 1.5],
                      },
                    },
                  ],
                  default: "$players.points",
                },
              },
            },
            players: {
              $addToSet: "$players",
            },
          },
        },
        {
          $sort: {
            Total1: -1,
          },
        },
      ]);
      return result;
    } catch (err) {
      logger.info(`Unable to fetch cap and Vcap the dreamTeam: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }

  async FetchDreamTeamCountByMatchId({ matchid }) {
    try {
      let result = await DreamteamModel.count({ matchid: matchid });
      return result;
    } catch (err) {
      logger.info(`Unable to fetcg the dreamTeam count: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }
}

module.exports = DreamTeamRepository;
