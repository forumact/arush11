import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import { fetchTeamAllTeam, createTeam, deleteTeamApi } from "../../services/TeamAPI";

const initialState = {
  loading: false,
  team: [],
  error: ''
}


export const getTeam = createAsyncThunk('team/fetchTeam', async () => {
  const response = await fetchTeamAllTeam();
  return response
})

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTeam: (state, action) => {
      state.team.push(action.payload)
      createTeam(action.payload);
    },
    editTeam: (state, action) => {
      const { tmid, teamname, image, status, tournament_name } = action.payload;
      const existingPost = state.team.find((post) => post.tmid === tmid)
      if (existingPost) {
        existingPost.tournament_name = tournament_name
        existingPost.teamname = teamname
        existingPost.image = image
        existingPost.status = status
      }
      createTeam(action.payload);
    },
    deleteTeam: (state, action) => {
      const { tmid, teamname } = action.payload;
      state.team = state.team.filter(team => team.tmid !== tmid);
      deleteTeamApi(tmid, teamname);
      console.log(current(state));
      // return false

    }
  },
  extraReducers: builder => {
    builder.addCase(getTeam.pending, state => {
      state.loading = true
    })
    builder.addCase(getTeam.fulfilled, (state, action) => {
      state.loading = false
      state.team = action.payload
      state.error = ''
    })
    builder.addCase(getTeam.rejected, (state, action) => {
      state.loading = false
      state.team = []
      state.error = action.error.message
    })
  }


});





export const { addTeam, editTeam, deleteTeam } = teamSlice.actions;

export default teamSlice.reducer;

