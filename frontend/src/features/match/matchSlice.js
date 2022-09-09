import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActivePlayerByMatch } from "../../services/PlayerAPI";

import { fetchMyMatches, deleteMatch } from '../../services/PlayerAPI';

const initialState = {
  loading: false,
  match: [],
  error: "",
};


export const getMatch = createAsyncThunk('match/fetchMatch', async () => {
  const response = await fetchMyMatches();
  return response
})

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    deleteMyMatch: (state, action) => {
      const { matchid } = action.payload;
      console.log(matchid);
      const existingUser = state.match.find((match) => match.matchid == matchid);
      if (existingUser) {
        deleteMatch(matchid);
        let response = state.match.filter((match) => match.matchid !== matchid);
        return {
          loading: false,
          match: response,
          error: "",
        };
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getMatch.pending, state => {
      state.loading = true
    })
    builder.addCase(getMatch.fulfilled, (state, action) => {
      state.loading = false
      state.match = action.payload
      state.error = ''
    })
    builder.addCase(getMatch.rejected, (state, action) => {
      state.loading = false
      state.match = []
      state.error = action.error.message
    })
  }
});

export const { deleteMyMatch } = matchSlice.actions;


export const selectAllMatch = state => state.match.match

export default matchSlice.reducer;
