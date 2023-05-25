import React,{useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux'
import {images} from '../../../constants/index'
import { setclickedLocation,setFlagsInUse } from '../../../features/DashBoard/DashBoardSlice'
const Cell = ({locationX,locationY,grid}) => {
  const dispatch = useDispatch()  
  const Ref = useRef()

  useEffect(() => {
    if(grid.length > 0){
      if(grid[locationX][locationY].revealed){
        Ref.current.classList.remove(`cell-${locationX}-${locationY}`)
        Ref.current.classList.add(`cellActive-${locationX}-${locationY}`)
      }
    }
  }, [grid])
  

  const placeFlag = ()=>{
    // update in matrix 
    dispatch(setFlagsInUse()) // increase flagsInUse +1
    if(!grid[locationX][locationY].revealed)
      grid[locationX][locationY].value = 'f'


  }
  return (
    <div className={`cell cell-${locationX}-${locationY}`} ref={Ref} 
    onContextMenu = {(e)=>{
      e.preventDefault()
      placeFlag()}}
    onClick={(e)=>{
      let location = [locationX,locationY]
      dispatch(setclickedLocation(location))
      }}>
    {grid.length > 0 &&  grid[locationX][locationY].revealed ? 
    (grid[locationX][locationY].value  != 0 ) ?
      grid[locationX][locationY].value 
      :'' 
    : (grid[locationX][locationY].value == 'f')?
      <img src={images.flag}/> :
      ''
    }
    </div>
  )
}

export default Cell