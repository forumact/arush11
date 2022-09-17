import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

import {
  fetchPeople, fetchPeopleByIdApi
} from "../../services/UserAPI";


const initialState = {
  loading: false,
  user: [],
  error: "",
};



export const getUser = createAsyncThunk('user/fetchPeople', async () => {
  const response = await fetchPeople();
  return response
})


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTournament: (state, action) => {
      console.log('edit user', action)
      state.user.push(action.payload)
      // createTournamentApi(action.payload);
    },
    editTournament: (state, action) => {
      const { tid, status, name } = action.payload;
      const existingPost = state.user.find((post) => post.tid === tid)
      if (existingPost) {
        existingPost.name = name
        existingPost.status = status
      }
      // updateTournament(tid, name, status);
      // const existingTournament = state.tournaments.find(user => user.tid == tid);
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
      const existingTournament = state.user.find(user => user.tid == tid);
      if (existingTournament) {
        // deleteTournamentApi(tid);
        state.user = state.user.filter(user => user.tid !== tid);
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      state.error = ''
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false
      state.user = []
      state.error = action.error.message
    })
  }
});


export const selectAlluser = state => state.squad.squad

// export const { addTournament, editTournament, deleteTournament } = userSlice.actions;

export default userSlice.reducer;


//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux