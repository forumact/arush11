const { DreamteamRepository } = require("../database");

class DreamteamService {
  constructor() {
    this.repository = new DreamteamRepository();
  }

  async DeleteDreamTeamByMatchId({ matchid }) {
    try {
      const team = await this.repository.DeleteDreamTeamByMatchId({ matchid });
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async FetchPlayerListByMatchId({}) {
    try {
      const team = await this.repository.FetchPlayerListByMatchId({ matchid });
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async FetchPlayersForResultPage({ matchid }) {
    try {
      const team = await this.repository.FetchPlayersForResultPage({ matchid });
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async UpdatePlayerPointsByMatchId({ players, matchid }) {
    try {
      const team = await this.repository.UpdatePlayerPointsByMatchId({players, matchid});
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async FetchDreamTeamDetailsById({}) {
    try {
      const team = await this.repository.FetchDreamTeamDetailsById({ matchid });
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async FetchCapAndVcap({}) {
    try {
      const team = await this.repository.FetchCapAndVcap({ matchid });
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async FetchDreamTeamCountByMatchId({matchid}) {
    try {
      const team = await this.repository.FetchDreamTeamCountByMatchId({
        matchid,
      });
      return team;
    } catch (err) {
      throw new Error("captains Data Not found", err);
    }
  }

  async CreateDreamTeam({ dreamTeam }) {
    try {
      const dteam = await this.repository.CreateDreamTeam({ dreamTeam });
      return dteam;
    } catch (err) {}
  }

  async PlayerListFromDreamTeamByMatchId({ matchid }) {
    try {
      const dteam = await this.repository.PlayerListFromDreamTeamByMatchId({
        matchid,
      });
      return dteam;
    } catch (err) {}
  }
}

module.exports = DreamteamService;
