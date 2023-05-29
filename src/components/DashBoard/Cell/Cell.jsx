import React,{useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {images} from '../../../constants/index'
import { setclickedLocation,setFlagsInUse,setGameOver } from '../../../features/DashBoard/DashBoardSlice'
const Cell = ({locationX,locationY,matrix,dispatchMatrix}) => {
  const dispatch = useDispatch()  
  const DashBoard = useSelector((state) => state.dashboard);
  const {gameStarted,Properties,level,flagsInUse} = DashBoard;
  let flagsTotal = Properties[level].flags
  const Ref = useRef()

  useEffect(() => {
    setColors()

    if(matrix.length > 0){
      // change style of cell at revealing cells
      if(matrix[locationX][locationY].revealed){
        Ref.current.classList.remove(`cell-${locationX}-${locationY}`)
        Ref.current.classList.add(`cellActive-${locationX}-${locationY}`)
      }else{
       Ref.current.classList.remove(`cellActive-${locationX}-${locationY}`)
       Ref.current.classList.add(`cell-${locationX}-${locationY}`)
      }
    }
  }, [matrix])
  
  // at click - if it is a bomb - game over. else, reveal this cell
  const setHole = ()=>{
    let location = [locationX,locationY]
    if(!matrix[locationX][locationY].flagged){ // don't allow user to click if there is a flag on the cell
      dispatch(setclickedLocation(location))
      if(matrix[locationX][locationY].value == 'x'){ // game over
        dispatch(setGameOver(true))
      }else {
        // reveal cell
        if(gameStarted && matrix[locationX][locationY].value != '0'){
          if(matrix[locationX][locationY].revealed == false){
            const updatedMatrix = [...matrix]
            updatedMatrix[locationX][locationY]={
              ...updatedMatrix[locationX][locationY],
              revealed: true
            }
            dispatchMatrix({type:'SET_MATRIX',matrix:updatedMatrix})
          }
        }
      }
    }
  }



  const setColors = ()=>{
    switch(Ref.current.textContent){
      case "1":
        Ref.current.style.color = "red"
        break;
      case "2":
        Ref.current.style.color = "purple"
        break;
      case "3":
        Ref.current.style.color = "brown"
        break;
      case "4":
        Ref.current.style.color = "orange"
        break;
      case "5":
        Ref.current.style.color = "blue"
        break;
      default:
        Ref.current.style.color = "pink"
        break;


    }
  }

  return (
    <div className={`cell cell-${locationX}-${locationY}`} ref={Ref} 
    onContextMenu = {(e)=>{
       e.preventDefault() // prevent default on right click 
       if(gameStarted){
        if(matrix[locationX][locationY].flagged)
            dispatch(setFlagsInUse(-1)) // remove flag
          else{ 
            if(flagsInUse < flagsTotal) // add flag only if you have left
              dispatch(setFlagsInUse(1)) // add flag
          }
      
      dispatchMatrix(
        {type:'SET_FLAG',
        payload: {
          x: locationX,
          y : locationY,
          flagged:!matrix[locationX][locationY].flagged
        }})
    }}
  }
    onClick={setHole}>
    {matrix.length > 0 &&  matrix[locationX][locationY].revealed ? ((matrix[locationX][locationY].value  != 0 ) ? matrix[locationX][locationY].value :'') 
    : (matrix.length > 0 && matrix[locationX][locationY].flagged)? <img src={images.flag}/> : ''
    }
    </div>
  )
}

export default Cell