import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchSquads, updateMatchPlayerById, fetchMatchPlayers } from "../../services/SquadAPI";
import _ from 'lodash';


const initialState = {
  loading: false,
  squad: [],
  error: "",
};



export const getSquad = createAsyncThunk('squad/fetchSquad', async ({ matchid, user_id, team1, team1img, team2, team2img }) => {
  const response = await fetchSquads(matchid, user_id, team1, team1img, team2, team2img);
  return response
})


const squadSlice = createSlice({
  name: "squad",
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log("edit user", action);
    },
    deletePlayer: (state, action) => {
      const { pid, role, teamrole } = action.payload;
      state.squad[teamrole].map(squad => {
        _.remove(squad[role], (pl) => pl.pid === pid)
        return squad[role];
      });
    },
    updatePlayer: (state, action) => {
      const { matchid, pid, team, name, role, picture, credits, status, star, current_role, teamrole } = action.payload;
      console.log(current(state))
      state.squad[teamrole].map(squad => {
        //Remove Matched element from the array
        console.log(current(squad))
        _.remove(squad[current_role], (pl) => pl.pid === pid)
        console.log(current(squad))
        //insert modified squad to the array
        squad[role].splice(0, 0, action.payload)
        updateMatchPlayerById(matchid, pid, team, name, role, picture, credits, status, star)
        return squad[role];
      });
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
  }
});


export const selectAllPlayers = state => state.squad.squad

export const { addUser, updatePlayer, deletePlayer } = squadSlice.actions;

export default squadSlice.reducer;
