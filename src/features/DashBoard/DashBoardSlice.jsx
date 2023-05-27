import { createSlice } from '@reduxjs/toolkit'
const game = [
  {level:"easy",size:9,bombs:10,flags:10},
  {level:"medium",size:12,bombs:40,flags:40},
  {level:"hard",size:14,bombs:99,flags:99},
]


export const DashBoardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    gameStarted: false,
    Properties: game,
    level:0,
    ClickLocation: [-1,-1],
    flagsInUse: 0,
    gameOver: false
  },
  reducers: {
    ChangeDifficulty: (state, action) => {
      state.level = action.payload
    },
    setclickedLocation: (state,action)=>{
      state.ClickLocation = action.payload
    },
    setFlagsInUse : (state,action)=>{
      state.flagsInUse +=action.payload; // action.playload = 1/-1 (add flag/ remove flag)
    },
    setGameStart : (state)=>{
      state.gameStarted = true;
    },
    setGameOver :(state,action)=>{
      state.gameOver = action.payload
    }
  }
})
export const {ChangeDifficulty,setclickedLocation,setFlagsInUse,setGameStart,setGameOver } = DashBoardSlice.actions

export default DashBoardSlice.reducer

