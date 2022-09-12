import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchPlayersByTeam, updatePlayerById } from "../../services/PlayerAPI";
import _ from 'lodash';

const initialState = {
  loading: false,
  player: [],
  error: "",
};


export const getPlayers = createAsyncThunk('player/fetchPlayers', async (team) => {
  const response = await fetchPlayersByTeam(team);
  return response
})


export const updatePlayerAndGet = createAsyncThunk('data/update', async (params) => {
  const { pid, team, name, role, picture, credits, status, star } = params;
  await updatePlayerById(pid, team, name, role, picture, credits, status, star)
  let response = await fetchPlayersByTeam({ team });
  console.log(response)
  return response
})


const remove = (data, removeId) => {
  return _.remove(data, (item) => item.id !== removeId)  // removes parent object if its id matches removeId
    .map(({ id, sub }) => ({ id, sub: _.remove(sub, (item) => item.id !== removeId) })) // replaces sub array with new sub array with subobject missing
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    deletePlayer: (state, action) => {
      const { pid, role } = action.payload;
      state.player.map(player => {
        _.remove(player[role], (pl) => pl.pid === pid)
        return player[role];
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(getPlayers.pending, state => {
      state.loading = true
    })
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      state.loading = false
      state.player = action.payload
      state.error = ''
    })
    builder.addCase(getPlayers.rejected, (state, action) => {
      state.loading = false
      state.player = []
      state.error = action.error.message
    })
    builder.addCase(updatePlayerAndGet.pending, state => {
      state.loading = true
    })
    builder.addCase(updatePlayerAndGet.fulfilled, (state, action) => {
      state.loading = false
      state.squad = action.payload
      state.error = ''
    })
    builder.addCase(updatePlayerAndGet.rejected, (state, action) => {
      state.loading = false
      state.squad = []
      state.error = action.error.message
    })
  }
});

export const { deletePlayer } = playerSlice.actions;

export default playerSlice.reducer;
