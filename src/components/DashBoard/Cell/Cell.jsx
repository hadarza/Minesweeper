import React,{useEffect,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {images} from '../../../constants/index'
import { setclickedLocation,setFlagsInUse,setGameOver } from '../../../features/DashBoard/DashBoardSlice'
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
    e.stopPropagation()
    console.log("click right");
    dispatchMatrix(
      {type:'SET_FLAG',
      payload: {
        x: locationX,
        y : locationY,
        flagged:!matrix[locationX,locationY].flagged
      }})
    dispatch(setFlagsInUse()) // increase flagsInUse +1
  }
  const setHole = ()=>{
    let location = [locationX,locationY]
    dispatch(setclickedLocation(location))
    if(matrix[locationX][locationY].value == 'x'){ // game over
      dispatch(setGameOver(true))
      console.log("yes");
    }

  }
  return (
    <div className={`cell cell-${locationX}-${locationY}`} ref={Ref} 
    onContextMenu = {(e)=>{
      console.log("hey");
       e.preventDefault() // prevent default on right click 
       e.stopPropagation(); // stop event propagation

      // dispatchMatrix(
      //   {type:'SET_FLAG',
      //   payload: {
      //     x: locationX,
      //     y : locationY,
      //     flagged:!matrix[locationX,locationY].flagged
      //   }})
      // dispatch(setFlagsInUse()) // increase flagsInUse +1
    }}
    onClick={setHole}>
    {matrix.length > 0 &&  matrix[locationX][locationY].revealed ? ((matrix[locationX][locationY].value  != 0 ) ? matrix[locationX][locationY].value :'') 
    : (matrix.length > 0 && matrix[locationX][locationY].flagged)? <img src={images.flag}/> : ''
    }
    </div>
  )
}

export default Cell