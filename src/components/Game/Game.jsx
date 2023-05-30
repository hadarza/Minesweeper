import React,{useReducer, useState,useEffect} from 'react'
import { useSelector } from 'react-redux'

import Menu from '../DashBoard/Menu/Menu'
import Board from '../DashBoard/Board/Board'
import MsgUser from '../MsgUser/MsgUser'

import {images} from '../../constants/index'

const Game = () => {
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
          return updatedMatrix 
        default:
          return state;
      }
    }
    
    const [matrix, dispatchMatrix] = useReducer(matrixReducer, initialMatrix);
  
    useEffect(() => {
      var win = false;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          // if all cells that aren't x - are revealed so user win!
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
      console.log(matrix)
    }, [matrix])
    
    return (
    <div className='game-page'>
        <Menu initialMatrix={initialMatrix} dispatchMatrix={dispatchMatrix}/>
        <Board matrix={matrix} dispatchMatrix={dispatchMatrix}/>
        {gameOver && <MsgUser 
        initialMatrix={initialMatrix}
         dispatchMatrix={dispatchMatrix} 
         title="אני רוצה לנסות שוב"
         img={images.bomb}
         altImg="Bomb"/>}

        {winTime && <MsgUser 
        initialMatrix={initialMatrix}
         dispatchMatrix={dispatchMatrix} 
         title="תרא/ה לכולם כמה טוב אתה!"
         img={images.winner}
         altImg="winner"/>}

    </div>
  )
}

export default Game