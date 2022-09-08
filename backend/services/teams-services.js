const { TeamRepository } = require('../database');

class TeamService {

  constructor() {
    this.repository = new TeamRepository();
  }

  async TeamList(filter) {
    try {
      const team = await this.repository.FindTeam(filter);
      return team;
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async CreateTeam({ filter, tmid, tournament_name, teamname, status, image }) {
    try {
      const team = await this.repository.CreateTeam({ filter, tmid, tournament_name, teamname, status, image });
      return team;
    } catch (error) {

    }
  }

  async FetchTeamById(filter) {
    try {
      const team = await this.repository.FetchTeamById(filter);
      return team;
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async DeleteTeam({ id }) {
    try {
      const team = await this.repository.DeleteTeamId({ id });
      return team;
    } catch (error) {

    }
  }

}


module.exports = TeamService;