/* create the redux store instance */
import { configureStore } from '@reduxjs/toolkit'
import DashBoardReducer from '../features/DashBoard/DashBoardSlice'

export default configureStore({
  reducer: {
    dashboard: DashBoardReducer
  }
})