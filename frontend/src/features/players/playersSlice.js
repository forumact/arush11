import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPlayersByTeam, updatePlayerById } from "../../services/PlayerAPI";

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
  await updatePlayerById( pid, team, name, role, picture, credits, status, star)
  let response = await fetchPlayersByTeam({ team});
  console.log(response)
  return response
})

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      const { uid } = action.payload;
      const existingUser = state.users.find((user) => user.uid == uid);
      if (existingUser) {
        let response = state.users.filter((user) => user.uid !== uid);
        return {
          loading: false,
          users: response,
          error: "",
        };
      }
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

// export const { addUser, editUser, deleteUser } = seriesSlice.actions;

export default playerSlice.reducer;
