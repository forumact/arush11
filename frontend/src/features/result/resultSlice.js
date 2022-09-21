import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchCreatedDreamTeam } from '../../services/DreamTeamAPI';
import _ from 'lodash';

import { groupByKey } from '../../utils';

const initialState = {
  loading: false,
  result: [],
  error: "",
};


export const getResult = createAsyncThunk('result/fetchResult', async (matchid) => {
  const dreamTeam = await FetchCreatedDreamTeam(matchid);
  let result = [];
  let mockresult = [];

  for (let inc = 0; inc < dreamTeam.data.data.length; inc++) {
    mockresult.push(
      _.orderBy(dreamTeam.data.data[inc].players, ["points"], ["desc"])
    );
  }

  mockresult.forEach(function (team, index) {
    result.push(groupByKey(team, "role"));
  });

  //  console.log(result);
  return result
})

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
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
    builder.addCase(getResult.pending, state => {
      state.loading = true
    })
    builder.addCase(getResult.fulfilled, (state, action) => {
      state.loading = false
      state.result = action.payload
      state.error = ''
    })
    builder.addCase(getResult.rejected, (state, action) => {
      state.loading = false
      state.result = []
      state.error = action.error.message
    })
  }
});

// export const { addUser, editUser, deleteUser } = resultSlice.actions;

export default resultSlice.reducer;
