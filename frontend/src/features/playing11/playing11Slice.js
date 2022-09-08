import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActivePlayerByMatch } from "../../services/PlayerAPI";

const initialState = {
  loading: false,
  playing11: [],
  error: "",
};


export const getPlaying11 = createAsyncThunk('squad/fetchSquad', async ({ team1, team2, matchid }) => {
  const response = await fetchActivePlayerByMatch({ team1, team2, matchid });
  return response
})

const playing11Slice = createSlice({
  name: "playing11",
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
    builder.addCase(getPlaying11.pending, state => {
      state.loading = true
    })
    builder.addCase(getPlaying11.fulfilled, (state, action) => {
      state.loading = false
      state.playing11 = action.payload
      state.error = ''
    })
    builder.addCase(getPlaying11.rejected, (state, action) => {
      state.loading = false
      state.playing11 = []
      state.error = action.error.message
    })
  }
});

// export const { addUser, editUser, deleteUser } = seriesSlice.actions;

export default playing11Slice.reducer;
