import React,{useEffect,useRef} from 'react'
import { useDispatch } from 'react-redux'
import {images} from '../../../constants/index'
import { setclickedLocation,setFlagsInUse } from '../../../features/DashBoard/DashBoardSlice'
const Cell = ({locationX,locationY,matrix,dispatchMatrix}) => {
  const dispatch = useDispatch()  
  const Ref = useRef()

  useEffect(() => {
    if(matrix.length > 0){
      if(matrix[locationX][locationY].revealed){
        Ref.current.classList.remove(`cell-${locationX}-${locationY}`)
        Ref.current.classList.add(`cellActive-${locationX}-${locationY}`)
      }
    }
  }, [matrix])
  

  const SetFlag = (e) =>{
    e.preventDefault() // prevent default on right click 
    dispatchMatrix(
      {type:'SET_FLAG',
      payload: {
        x: locationX,
        y : locationY,
        flagged:!matrix[locationX,locationY].flagged
      }})
    dispatch(setFlagsInUse()) // increase flagsInUse +1
  }
  return (
    <div className={`cell cell-${locationX}-${locationY}`} ref={Ref} 
    onContextMenu = {SetFlag}
    onClick={(e)=>{
      let location = [locationX,locationY]
       dispatch(setclickedLocation(location))
      }}>
    {matrix.length > 0 &&  matrix[locationX][locationY].revealed ? ((matrix[locationX][locationY].value  != 0 ) ? matrix[locationX][locationY].value :'') 
    : (matrix.length > 0 && matrix[locationX][locationY].flagged)? <img src={images.flag}/> : ''
    }
    </div>
  )
}

export default Cell