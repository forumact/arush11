const logger = require('../../utlis/logger');
const { TeamModel } = require("../models");

//Dealing with data base operations
class TeamRepository {
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async CreateTournament({ filter, tournament_name, teamname, status }) {
    try {
      let tupdate = await TeamModel.updateOne(
        filter,
        {
          name: tournament_name,
          teamname: teamname,
          status: status || "inactive",
        },
        {
          upsert: true,
        }
      );
      return tupdate;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);
      throw new Error("Unable to Create User");
    }
  }

  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async FindTeam({ filter }) {
    try {
      const existingTeam = await TeamModel.find(
        filter,
        null,
        {
          limit: 25,
          sort: {
            // name: 1, //Sort by Date Added DESC
            tournament_name: 1
          },
        });
      return existingTeam;
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
  async FetchTeamById({ filter }) {
    try {
      const existingTeam = await TeamModel.find(
        filter,
        null,
        {
          limit: 1,
          sort: {
            // name: 1, //Sort by Date Added DESC
            createdAt: -1
          },
        });
      return existingTeam;
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
  async DeleteTeamId({ id }) {
    try {
      const deletedTeam = await TeamModel.deleteOne({ tmid: id });
      return deletedTeam;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Delete The User");
    }
  }

  async CreateTeam({ filter, tmid, tournament_name, teamname, status, image }) {
    try {
      let tupdate = await TeamModel.updateOne(
        filter,
        {
          tmid: tmid,
          tournament_name: tournament_name,
          teamname: teamname,
          image: image,
          status: status || "inactive",
        },
        {
          upsert: true,
        }
      );
      return tupdate;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);
      throw new Error("Unable to Delete The User");
    }
  }

}

module.exports = TeamRepository;

