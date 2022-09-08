import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSquads } from "../../services/SquadAPI";


const initialState = {
  loading: false,
  squad: [],
  error: "",
};


export const getSquad = createAsyncThunk('squad/fetchSquad', async ({matchid, user_id, team1, team1img, team2, team2img}) => {
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
    editUser: (state, action) => {
      const { uid, name, email, status } = action.payload;
    },
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

export const { addUser, editUser, deleteUser } = squadSlice.actions;

export default squadSlice.reducer;
