const logger = require('../../utlis/logger');
const { MymatchModel } = require("../models");

//Dealing with data base operations
class MyMatchRepository {
  /**
   *
   * @param {*} param0
   * @returns
   */
  async CreateMatch({
    matchid,
    userid,
    team1,
    team2,
    winningteam,
    pitchreport,
    winningposibility,
    players,
    team1img,
    team2img
  }) {
    try {
      const oldMatchId = await this.FindMatches({ matchid });
      if (!oldMatchId) {
        const match = new MymatchModel({
          matchid,
          userid,
          team1,
          team2,
          winningteam,
          pitchreport,
          winningposibility,
          players,
          team1img,
          team2img
        });
        const matchResult = await match.save();
        return matchResult;
      }
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Create Match");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async FindMatches({ matchid }) {
    try {
      const existingMatches = await MymatchModel.findOne(
        { matchid: matchid },
        {
          matchid: 1,
          _id: 0,
        }
      );
      return existingMatches;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Find User");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async FindMatchesByUserId({ filter }) {
    try {
      const existingUser = await MymatchModel.find(filter, null, {
        limit: 25,
      });
      return existingUser;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Find User");
    }
  }

  async FindFlagByTeam({ filter }) {
    try {
      const existingUser = await MymatchModel.find(filter, null, {
        limit: 25,
      });
      return existingUser;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Find User");
    }
  }


  /**
   *
   * @param {*} param0
   * @returns
   */
  async DeleteMatch({ matchid }) {
    try {
      const matchdelete = await MymatchModel.findOneAndDelete({
        matchid: matchid,
      });
      return matchdelete;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Delete The Captains");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async DeleteManyCaptainsByMatchId({ matchid }) {
    try {
      let deletedCaptains = await MymatchModel.deleteMany({
        matchid: matchid,
      });
      return deletedCaptains;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Delete The Captains");
    }
  }

  async FetchMyMatchPlayersById({ mid, pid }) {
    try {
      let player = MymatchModel.find(
        {
          matchid: mid,
          players: {
            $elemMatch: {
              pid: pid,
            },
          },
        },
        {
          "players.$": 1,
        }
      );
      return player;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Delete The Captains");
    }
  }

  async UpdateMatchPlayer({
    matchid,
    pid,
    name,
    role,
    picture,
    team,
    credits,
    status,
    star,
  }) {
    try {
      let matchupdate = await MymatchModel.updateOne(
        {
          matchid: matchid,
          "players.pid": pid,
        }, // Query parameter
        {
          $set: {
            "players.$.name": name,
            "players.$.role": role,
            "players.$.picture": picture,
            "players.$.team": team,
            "players.$.credits": credits,
            "players.$.status": status,
            "players.$.star": star,
          },
        }, // Replacement document
        {}
      );
      return matchupdate;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Update The Mymatch Player");
    }
  }

  async FetchAllPlayersByMatchId({ matchid }) {
    try {
      let result = await MymatchModel.find(
        {
          matchid: matchid,
        },
        {
          players: 1,
        }
      ).sort({
        players: -1,
      });
      return result;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Delete The Captains");
    }
  }

  async UpdatePitchReportByMatchId({ matchid, user_id, team1, team2, cp, cpt, vcp, vcpt, combo, partition, points_start, points_end, teamcount }) {

    // console.log('finalupdate123', matchid, user_id, team1, team2, cp, cpt, vcp, vcpt, combo, partition, points_start, points_end, teamcount)
    try {
      let matchupdate = await MymatchModel.updateOne(
        {
          matchid: matchid,
        }, // Query parameter
        {
          $set: {
            captainteam: cpt,
            captainchoice: cp,
            vcaptainchoice: vcp,
            vicecaptainteam: vcpt,
            combination: combo,
            partition: partition,
            pointsstart: points_start,
            pointsend: points_end,
            teamcount: teamcount
          },
        },
        {}
      );
      // console.log('matchupdate', matchupdate)
      return matchupdate;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);
      console.log('asdfasdfsfsdf', err)
      throw new Error("Unable to Update The PitchReport");
    }
  }

  async UpdateMatchStatusByMatchId({ matchid, status }) {
    try {
      let matchupdate = await MymatchModel.updateOne(
        {
          matchid: matchid,
        }, // Query parameter
        {
          status: status,
        }, // Replacement document
        {}
      );
      return matchupdate;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Update The PitchReport");
    }
  }
}

module.exports = MyMatchRepository;
