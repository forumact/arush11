import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchPeople, fetchPeopleByIdApi } from "../../api/api";
import { fetchTeam } from '../../services/TeamAPI';

const initialState = {
  loading: false,
  series: [],
  error: "",
};


export const getSeries = createAsyncThunk('series/fetchSeries', async () => {
  const response = await fetchTeam();
  return response
})

const seriesSlice = createSlice({
  name: "series",
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
    builder.addCase(getSeries.pending, state => {
      state.loading = true
    })
    builder.addCase(getSeries.fulfilled, (state, action) => {
      state.loading = false
      state.series = action.payload
      state.error = ''
    })
    builder.addCase(getSeries.rejected, (state, action) => {
      state.loading = false
      state.series = []
      state.error = action.error.message
    })
  }
});

// export const { addUser, editUser, deleteUser } = seriesSlice.actions;

export default seriesSlice.reducer;
