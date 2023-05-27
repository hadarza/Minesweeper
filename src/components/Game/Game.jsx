import React,{useReducer, useState,useEffect} from 'react'
import Menu from '../DashBoard/Menu/Menu'
import Board from '../DashBoard/Board/Board'
import GameOver from '../GameOver/GameOver'
import { useSelector } from 'react-redux'

const Game = () => {
  const game = useSelector((state) => state.dashboard);
  const [winTime,setWinTime] = useState(false);
  const {size,gameOver} = game;

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
    
    function matrixReducer(state, action) {
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
            
        default:
          return state;
      }
    }
    
    const [matrix, dispatchMatrix] = useReducer(matrixReducer, initialMatrix);
  
    useEffect(() => {
      console.log(matrix);
      var win = false;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if(matrix[i][j].value == ''){
            if(matrix[i][j].revealed)
              win = true;
            else {
              win = false;
              return;
            }
          }
        }
      }
      if(win) setWinTime(true)
      console.log(win)
    }, [matrix])
    return (
    <div className='game-page'>
        <Menu/>
        <Board matrix={matrix} dispatchMatrix={dispatchMatrix}/>
        {gameOver && <GameOver matrix={matrix} dispatchMatrix={dispatchMatrix}/>}
        {winTime && <p>winner!!</p>}
    </div>
  )
}

export default Game