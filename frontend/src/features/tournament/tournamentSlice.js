import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import {
  fetchTournament, deleteTournamentApi,
  createTournamentApi, fetchTournamentByIdApi,
  updateTournament
} from "../..//services/TournamentAPI";


const initialState = {
  loading: false,
  tournament: [],
  error: "",
};



export const getTournament = createAsyncThunk('tournament/fetchtournament', async () => {
  const response = await fetchTournament();
  return response
})


export const updateDataAndGet = createAsyncThunk('data/update', async (params) => {
  const { matchid, pid, team, name, role, picture, credits, status, star, team1, team2 } = params;
  await updateTournament(matchid, pid, team, name, role, picture, credits, status, star)
  let response = await fetchTournament({ team1, team2, matchid });
  console.log(response)
  return response
})


const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    addTournament: (state, action) => {
      console.log('edit user', action)
      state.tournament.push(action.payload)
      createTournamentApi(action.payload);
    },
    editTournament: (state, action) => {
      const { tid, status, name } = action.payload;
      const existingPost = state.tournament.find((post) => post.tid === tid)
      if (existingPost) {
        existingPost.name = name
        existingPost.status = status
      }
      updateTournament(tid, name, status);
      // const existingTournament = state.tournaments.find(tournament => tournament.tid == tid);
      // if (existingTournament) {
      //   existingTournament.tid = tid;
      //   existingTournament.teamname = teamname;
      //   existingTournament.image = image;
      //   existingTournament.tournament_name = tournament_name;
      //   existingTournament.status = status;
      // }

    },
    deleteTournament: (state, action) => {
      const { tid } = action.payload;
      const existingTournament = state.tournament.find(tournament => tournament.tid == tid);
      if (existingTournament) {
        deleteTournamentApi(tid);
        state.tournament = state.tournament.filter(tournament => tournament.tid !== tid);
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getTournament.pending, state => {
      state.loading = true
    })
    builder.addCase(getTournament.fulfilled, (state, action) => {
      state.loading = false
      state.tournament = action.payload
      state.error = ''
    })
    builder.addCase(getTournament.rejected, (state, action) => {
      state.loading = false
      state.tournament = []
      state.error = action.error.message
    })
    builder.addCase(updateDataAndGet.pending, state => {
      state.loading = true
    })
    builder.addCase(updateDataAndGet.fulfilled, (state, action) => {
      state.loading = false
      state.tournament = action.payload
      state.error = ''
    })
    builder.addCase(updateDataAndGet.rejected, (state, action) => {
      state.loading = false
      state.tournament = []
      state.error = action.error.message
    })
  }
});


export const selectAllPlayers = state => state.squad.squad

export const { addTournament, editTournament, deleteTournament } = tournamentSlice.actions;

export default tournamentSlice.reducer;


//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux