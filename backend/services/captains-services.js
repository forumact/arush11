const { CaptainRepository } = require('../database');

class CaptainService {

  constructor() {
    this.repository = new CaptainRepository();
  }

  async CaptainList({matchid}) {
    try {      
      const captains = await this.repository.FindCaptains({matchid});
      return captains;
    } catch (err) {
      throw new Error('captains Data Not found', err)
    }
  }

  async CreateCaptain({ matchid, teamname, results }){    
    try {
      const captains = await this.repository.CreateCaptain({ matchid, teamname, results });
      return captains;
    } catch (error) {
      throw new Error('captains Data Not created', err)
    }
  }

    async DeleteCaptain({ matchid }){    
    try {
      const captains = await this.repository.DeleteManyCaptainsByMatchId({ matchid });
      return captains;
    } catch (error) {
      throw new Error('captains Data Not created', err)
    }
  }

}


module.exports = CaptainService;