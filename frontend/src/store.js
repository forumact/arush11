import { configureStore } from '@reduxjs/toolkit';
import seriesReducer from './features/series/seriesSlice';
import squadReducer from './features/squad/squadSlice';
import playing11Reducer from './features/playing11/playing11Slice';
import matchReducer from './features/match/matchSlice';
import playerReducer from './features/players/playersSlice';
import tournamentReducer from './features/tournament/tournamentSlice';
import teamReducer from './features/team/teamSlice';
import userReducer from './features/user/userSlice';
import resultReducer from './features/result/resultSlice';


export const store = configureStore({
  reducer: {
    squad: squadReducer,
    series: seriesReducer,
    playing11: playing11Reducer,
    match: matchReducer,
    player: playerReducer,
    tournament: tournamentReducer,
    team: teamReducer,
    user: userReducer,
    result: resultReducer,
  },
})