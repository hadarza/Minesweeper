import { createSlice } from '@reduxjs/toolkit'
const game = [
  {level:"easy",size:9,bombs:10,flags:40},
  {level:"medium",size:12,bombs:15,flags:60},
  {level:"hard",size:14,bombs:25,flags:80},
]


export const DashBoardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    difficulty: game[0].level,
    size: game[0].size,
    ClickLocation: [-1,-1],
    flagsTotal: game[0].flags,
    bombTotal: game[0].bombs,
    flagsInUse: 0
  },
  reducers: {
    ChangeDifficulty: (state, action) => {
      state.difficulty = action.payload
    },
    setclickedLocation: (state,action)=>{
      state.ClickLocation = action.payload
    }
  }
})
export const {ChangeDifficulty,setclickedLocation } = DashBoardSlice.actions

export default DashBoardSlice.reducer

