const logger = require('../../utlis/logger');
const { TournamentModel } = require("../models");

//Dealing with data base operations
class TournamentRepository {
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  async CreateTournament({ filter, tid, name, status }) {
    try {
      let tupdate = await TournamentModel.updateOne(
        filter,
        {
          tid: tid,
          name: name,
          status: status || "inactive",
        },
        {
          upsert: true,
        }
      );
      console.log('tupdate0000', tupdate)
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
  async FindTournament({ filter }) {
    try {
      const tournaments = await TournamentModel.find(
        filter,
        null,
        {
          limit: 25,
          sort: {
            createdAt: 1, //Sort by Date Added DESC
          },
        });
      return tournaments;
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
  async FetchTournamentById({ filter }) {
    try {
      const tournaments = await TournamentModel.find(
        filter,
        null,
        {
          limit: 1,
          sort: {
            name: 1, //Sort by Date Added DESC
          },
        });
      return tournaments;
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
  async DeleteTournamentById({ id }) {
    try {
      const deletedTournament = await TournamentModel.deleteOne({ tid: id });
      return deletedTournament;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);
      throw new Error("Unable to Delete The User");
    }
  }

}

module.exports = TournamentRepository;

