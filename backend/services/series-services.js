const { TournamentRepository } = require('../database');

class TournamentService {

  constructor() {
    this.repository = new TournamentRepository();
  }

  async TournamentList(filter) {
    try {      
      const tournamenet = await this.repository.FindTournament({filter});
      return tournamenet;
    } catch (err) {
      throw new Error('Data Not found', err)
    }
  }

  async FetchTournamentById(filter){
    try {
      const dtournament = await this.repository.FetchTournamentById(filter);
      return dtournament;
    } catch (err) {
      
    }
  }


  async CreateTournament({filter, tid, name, status}){
    try {
      const tournamenet = await this.repository.CreateTournament({filter, tid, name, status});
      return tournamenet;
    } catch (err) {
      
    }
  }

  async DeleteTournament({id}){
    try {
      const dtournament = await this.repository.DeleteTournamentById({id});
      return dtournament;
    } catch (err) {
      
    }
  }

}


module.exports = TournamentService;