const logger = require("../../utlis/logger");
const { CaptainModel } = require("../models");

//Dealing with data base operations
class CaptainRepository {
  /**
   *
   * @param {*} param0
   * @returns
   */
  async CreateCaptain({ matchid, teamname, results }) {
    try {
      let deleteCaptains = await this.DeleteManyCaptains({ matchid, teamname });
      let captainsResult = await CaptainModel.insertMany(results);
      return captainsResult;
    } catch (err) {
      logger.info(`Unable to create captain: ${err}`);
      throw new Error("Unable to Create Captains");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async FindCaptains({ matchid }) {
    try {
      const existingCaptains = await CaptainModel.find({ matchid: matchid });
      return existingCaptains;
    } catch (err) {
      logger.info(`Unable to find captain: ${err}`);
      throw new Error("Unable to Find User");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async FindCaptainsById({ id }) {
    try {
      const existingUser = await CaptainModel.findById(id);
      return existingUser;
    } catch (err) {
      logger.info(`Unable to find captain: ${err}`);
      throw new Error("Unable to Find User");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async DeleteManyCaptains({ matchid, teamname }) {
    try {
      let deletedCaptains = await CaptainModel.deleteMany({
        matchid: matchid,
        teamname: teamname,
      });
      return deletedCaptains;
    } catch (err) {
      logger.info(`Unable to delete captain: ${err}`);
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
      let deletedCaptains = await CaptainModel.deleteMany({
        matchid: matchid,
      });
      return deletedCaptains;
    } catch (err) {
      logger.info(`Unable to delete captain: ${err}`);
      throw new Error("Unable to Delete The Captains");
    }
  }
}

module.exports = CaptainRepository;
