import React,{useEffect,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {images} from '../../../constants/index'
import { setclickedLocation,setFlagsInUse,setGameOver } from '../../../features/DashBoard/DashBoardSlice'

const Cell = ({locationX,locationY,matrix,dispatchMatrix}) => {
  const dispatch = useDispatch()  
  const DashBoard = useSelector((state) => state.dashboard);
  const {gameStarted,Properties,level,flagsInUse,gameOver} = DashBoard;
  let flagsTotal = Properties[level].flags
  const cellRef = useRef()

  useEffect(() => {
    setColors()
    if(matrix.length > 0){
      // change style of cell at revealing cells
      if(matrix[locationX][locationY].revealed){
        cellRef.current.classList.remove(`cell-${locationX}-${locationY}`)
        cellRef.current.classList.add(`cellActive-${locationX}-${locationY}`)
      }else{
        cellRef.current.classList.remove(`cellActive-${locationX}-${locationY}`)
        cellRef.current.classList.add(`cell-${locationX}-${locationY}`)
      }
    }
  }, [matrix])
  
  // at click - if it is a bomb - game over. else, reveal this cell
  const setHole = ()=>{
    if(!gameOver){
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
  }
  // set font colors to cells on board
  const setColors = ()=>{
    switch(cellRef.current.textContent){
      case "1":
        cellRef.current.style.color = "red"
        break;
      case "2":
        cellRef.current.style.color = "purple"
        break;
      case "3":
        cellRef.current.style.color = "brown"
        break;
      case "4":
        cellRef.current.style.color = "orange"
        break;
      case "5":
        cellRef.current.style.color = "blue"
        break;
      case "6":
        cellRef.current.style.color = "green"
        break;
      case "7":
        cellRef.current.style.color = "cyan"
        break;
      default:
        cellRef.current.style.color = "pink"
        break;
    }
  }

  const cell = matrix[locationX][locationY];
const flagged = cell.flagged;

const handleContextMenu = (e) => {
  e.preventDefault(); // prevent default on right click

  if (gameStarted) {
    if (flagged) {
      dispatch(setFlagsInUse(-1)); // remove flag
    } else {
      if (flagsInUse < flagsTotal) {
        dispatch(setFlagsInUse(1)); // add flag
      }
    }

    dispatchMatrix({
      type: 'SET_FLAG',
      payload: {
        x: locationX,
        y: locationY,
        flagged: !flagged
      }
    });
  }
};


  return (
    <div className={`cell cell-${locationX}-${locationY}`} ref={cellRef} 
    onContextMenu = {handleContextMenu}
    onClick={setHole}>
    {matrix.length > 0 &&  matrix[locationX][locationY].revealed ? ((matrix[locationX][locationY].value  != 0 ) ? matrix[locationX][locationY].value :'') 
    : (matrix.length > 0 && matrix[locationX][locationY].flagged)? <img src={images.flag}/> : ''
    }
    </div>
  )
}

export default Cell