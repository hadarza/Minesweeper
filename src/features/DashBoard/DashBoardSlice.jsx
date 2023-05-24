import { createSlice } from '@reduxjs/toolkit'
const difficulty = {
  easy: 1,
  medimum: 2,
  hard: 3,
}

export const DashBoardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    difficulty: difficulty.easy,
  },
  reducers: {
    ChangeDifficulty: (state, action) => {
      state.difficulty = action.payload
    }
  }
})
export const {ChangeDifficulty } = DashBoardSlice.actions

export default DashBoardSlice.reducer

