import React,{useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux'
import { setclickedLocation } from '../../../features/DashBoard/DashBoardSlice'
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
  
  return (
    <div className={`cell cell-${locationX}-${locationY}`} ref={Ref} onClick={(e)=>{
      let location = [locationX,locationY]
       dispatch(setclickedLocation(location))
      }}>
    {grid.length > 0 &&  grid[locationX][locationY].revealed ? 
    (grid[locationX][locationY].value  != 0 ) ?
      grid[locationX][locationY].value 
      :'' 
    : ''}
    </div>
  )
}

export default Cell