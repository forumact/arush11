const { PlayerRepository } = require('../database');

class PlayerServices {

  constructor() {
    this.repository = new PlayerRepository();
  }

  async CreatePlayer({ pid, name, role, picture, team, credits, status, star }) {
    try {
      const player = await this.repository.CreatePlayer({ pid, name, role, picture, team, credits, status, star });
      return player;
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async PlayerList(filter) {
    try {
      const player = await this.repository.FindAllPlayer(filter);
      return player;
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async FindPlayerById(filter) {
    try {
      const player = await this.repository.FindPlayerById(filter);
      return player;
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async UpdatePlayerById({ filter, name, role, picture, team, credits, status, star }) {
    try {
      const player = await this.repository.UpdatePlayerById({ filter, name, role, picture, team, credits, status, star })
      return player
    } catch (err) {

    }
  }

  async DeletePlaerById({ pid }) {
    try {
      const player = await this.repository.DeletePlaerById({ pid })
      return player
    } catch (err) {

    }
  }

  async DeleteAllPlaerByTeam({ team }) {
    try {
      const player = await this.repository.DeleteAllPlaerByTeam({ team })
      return player
    } catch (err) {

    }
  }

}


module.exports = PlayerServices;