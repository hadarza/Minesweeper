import React,{useReducer, useState,useEffect} from 'react'
import Menu from '../DashBoard/Menu/Menu'
import Board from '../DashBoard/Board/Board'
import GameOver from '../GameOver/GameOver'
import { useSelector,useDispatch } from 'react-redux'
import Winner from '../Winner/Winner'
import {ResetGame} from '../../features/DashBoard/DashBoardSlice'

const Game = () => {
  const dispatch = useDispatch()
  const game = useSelector((state) => state.dashboard);
  const [winTime,setWinTime] = useState(false);
  const {gameOver,Properties,level} = game;
  const size = Properties[level].size

    // properties of cell
    const properites = {
      revealed: false,
      flagged: false,
      value: 0
    }  

    /* initalize the board to size base on difficulty */
    const initialMatrix = (() => {
      const matrix = [];
      for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size);
      }
    
      // Create empty matrix with properties
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          matrix[i][j] = properites; // Replace 'properties' with your desired value
        }
      }
      return matrix;
    })();
    
    function matrixReducer(state = initialMatrix, action) {
      switch (action.type) {
        case 'SET_MATRIX':
          return action.matrix;
        case 'SET_FLAG':
          const {x,y,flagged} = action.payload;
          const updatedMatrix = [...state] // get exist matrix
          updatedMatrix[x][y] ={
            ...updatedMatrix[x][y],
            flagged:flagged // set flagged based on action.payload
          }
           return updatedMatrix 
          case 'INITIAL_STATE':
            return initialMatrix
        default:
          return state;
      }
    }
    
    const [matrix, dispatchMatrix] = useReducer(matrixReducer, initialMatrix);
  
    useEffect(() => {
      var win = false;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if(matrix[i][j].value != 'x'){
            if(matrix[i][j].revealed) win = true;
            else {
              win = false;
              return;
            }
          }
        }
      }
      if(win) setWinTime(true)
    }, [matrix])
    
  
    const playAgain = ()=>{
      dispatch(ResetGame())
      dispatchMatrix({type:'INITIAL_STATE'})
      console.log(matrix);
  }
    return (
    <div className='game-page'>
        <Menu/>
        <Board matrix={matrix} dispatchMatrix={dispatchMatrix}/>
        {gameOver && <GameOver matrix={matrix} dispatchMatrix={dispatchMatrix} playAgain={playAgain}/>}
        {winTime && <Winner playAgain={playAgain}/>}
    </div>
  )
}

export default Game