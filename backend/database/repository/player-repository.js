const logger = require('../../utlis/logger');
const { PlayerModel } = require("../models");

//Dealing with data base operations
class PlayerRepository {
  /**
   *
   * @param {*} param0
   * @returns
   */
  async CreatePlayer({ pid, name, role, picture, team, credits, status, star }) {
    try {
      const player = new PlayerModel({
        pid,
        name,
        role,
        picture,
        team,
        team,
        credits,
        status,
        star,
      });
      const playerResult = await player.save();
      return playerResult;
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
  async FindPlayerById(id) {
    try {
      const Player = await PlayerModel.find(id);
      return Player;
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
  async FindAllPlayer({ filter }) {
    try {
      const Player = await PlayerModel.find(filter, null, {
        limit: 50,
        sort: {
          role: 1, //Sort by Date Added DESC
        },
      });
      return Player;
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
  async DeletePlaerById({ id }) {
    try {
      const deletedUser = await PlayerModel.findByIdAndRemove(id);
      return deletedUser;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);

      throw new Error("Unable to Delete The User");
    }
  }

  /**
   *
   * @param {*} param0
   * @returns
   */
  async UpdatePlayerById({ filter, name, role, picture, team, credits, status, star }) {
    // const filter = id ? { _id: id } : {};
    try {
      let tupdate = await PlayerModel.updateOne(
        filter,
        {
          name: name,
          role: role,
          picture: picture,
          team: team,
          credits: credits,
          status: status,
          star: star,
        },
        {}
      );
      return tupdate;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);
      throw new Error("Unable to Update The User");
    }
  }

  async DeleteAllPlaerByTeam({ team }) {
    try {
      let deletedPlayers = await PlayerModel.deleteMany({
        team: team,
      });
      return deletedPlayers;
    } catch (err) {
      logger.info(`Data Base Action Failed: ${err}`);
      throw new Error("Unable to Delete The Players");
    }
  }
}

module.exports = PlayerRepository;
