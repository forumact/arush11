import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchSquads, updateMatchPlayerById, fetchMatchPlayers } from "../../services/SquadAPI";


const initialState = {
  loading: false,
  squad: [],
  error: "",
};



export const getSquad = createAsyncThunk('squad/fetchSquad', async ({ matchid, user_id, team1, team1img, team2, team2img }) => {
  const response = await fetchSquads(matchid, user_id, team1, team1img, team2, team2img);
  return response
})


export const updateDataAndGet = createAsyncThunk('data/update', async (params) => {
  const { matchid, pid, team, name, role, picture, credits, status, star, team1, team2 } = params;
  await updateMatchPlayerById(matchid, pid, team, name, role, picture, credits, status, star)
  let response = await fetchMatchPlayers({ team1, team2, matchid });
  console.log(response)
  return response
})


const squadSlice = createSlice({
  name: "squad",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("edit user", action);
    },
    editPlayer: async (state, action) => {
      // const { matchid, pid, team, name, role, picture, credits, status, star } = action.payload;
      // updateDataAndGet(matchid, pid, team, name, role, picture, credits, status, star);
      // let team1 = 'zim';
      // let team2 = 'aus';
      // let response = await fetchMatchPlayers({ team1, team2, matchid });
      // console.log('response', response)
      // return {
      //   loading: false,
      //   squad: state,
      //   error: "",
      // };
    },
  },
  extraReducers: builder => {
    builder.addCase(getSquad.pending, state => {
      state.loading = true
    })
    builder.addCase(getSquad.fulfilled, (state, action) => {
      state.loading = false
      state.squad = action.payload
      state.error = ''
    })
    builder.addCase(getSquad.rejected, (state, action) => {
      state.loading = false
      state.squad = []
      state.error = action.error.message
    })
    builder.addCase(updateDataAndGet.pending, state => {
      state.loading = true
    })
    builder.addCase(updateDataAndGet.fulfilled, (state, action) => {
      state.loading = false
      state.squad = action.payload
      state.error = ''
    })
    builder.addCase(updateDataAndGet.rejected, (state, action) => {
      state.loading = false
      state.squad = []
      state.error = action.error.message
    })
  }
});


export const selectAllPlayers = state => state.squad.squad

export const { addUser, editPlayer, deleteUser } = squadSlice.actions;

export default squadSlice.reducer;
