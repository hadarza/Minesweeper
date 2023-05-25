import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'
import { setclickedLocation } from '../../../features/DashBoard/DashBoardSlice'
const Cell = ({locationX,locationY,grid}) => {
  const dispatch = useDispatch()  

  return (
    <div className='cell' onClick={()=>{
      let location = [locationX,locationY]
       dispatch(setclickedLocation(location))
      }}>
    {grid.length > 0  ? grid[locationX][locationY].value : ''}
    </div>
  )
}

export default Cell