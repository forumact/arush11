
const { MymatchRepository } = require('../database')
class MymatchService {

  constructor() {
    this.repository = new MymatchRepository();
  }

  
  async CreateUserMatch({ matchid, userid, team1, team2, winningteam, pitchreport, winningposibility, players, team1img, team2img }) {
    try {
      const match = await this.repository.CreateMatch({ matchid, userid, team1, team2, winningteam, pitchreport, winningposibility, players, team1img, team2img });
      return match;
    } catch (err) {
      throw new Error('Match Not Created', err)
    }
  }

  async fetchMyMatchPlayers({matchid}) {
    try {
      const players = await this.repository.FetchAllPlayersByMatchId({matchid});
      return players
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async UpdateMatchPlayer({matchid, pid, name, role, picture, team, credits, status, star}){
    try {
      const players = await this.repository.UpdateMatchPlayer({matchid, pid, name, role, picture, team, credits, status, star});
      return players;
    }catch (err) {

    }
  }

  async FetchMyMatchPlayersById({ mid, pid }){
    try{
      const players = await this.repository.FetchMyMatchPlayersById({ mid, pid });
      return players;
    }catch(err){

    }
  }

  async FindMatchesByUserId({filter}) {
    try{
      const players = await this.repository.FindMatchesByUserId({ filter });
      return players;
    }catch(err){

    }
  }
  

  async UpdatePitchReportByMatchId({ matchid, user_id, team1, team2, cp, cpt, vcp, vcpt, combo, partition, points_start, points_end, teamcount }) {
    try {
      
      const pitchreport = await this.repository.UpdatePitchReportByMatchId({ matchid, user_id, team1, team2, cp, cpt, vcp, vcpt, combo, partition, points_start, points_end, teamcount });
      return pitchreport;
    } catch (err) {
      
    }
  }


  async UpdateMatchStatusByMatchId({matchid, status}) {
    try{
      const mstatus = await this.repository.UpdateMatchStatusByMatchId({ matchid, status });
      return mstatus;
    }catch(err){

    }
  }  
  
  async DeleteMatch({matchid }) {
    try{
      const mstatus = await this.repository.DeleteMatch({ matchid });
      return mstatus;
    }catch(err){

    }
  }

}

module.exports = MymatchService;