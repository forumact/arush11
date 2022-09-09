import { configureStore } from '@reduxjs/toolkit';
import seriesReducer from './features/series/seriesSlice';
import squadReducer from './features/squad/squadSlice';
import playing11Reducer from './features/playing11/playing11Slice';
import matchReducer from './features/match/matchSlice';
// import teamReducer from './features/teams/teamSlice';
// import tournamentReducer from './features/tournament/tournamentSlice';

export const store = configureStore({
  reducer: {
    squad: squadReducer,
    series: seriesReducer,
    playing11: playing11Reducer,
    match: matchReducer,
  },
})