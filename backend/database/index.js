// database related modules
module.exports = {
  databaseConnection: require('./db'),
  CaptainRepository: require('./repository/captain-repository'),
  DreamteamRepository: require('./repository/dreamteam-repository'),
  MymatchRepository: require('./repository/mymatch-repository'),
  PlayerRepository: require('./repository/player-repository'),
  TeamRepository: require('./repository/team-repository'),
  TournamentRepository: require('./repository/tournament-repository'),
  UserRepository: require('./repository/user-repository'),
}