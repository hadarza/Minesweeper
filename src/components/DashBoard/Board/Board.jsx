import React, {useEffect,useReducer } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setGameStart} from '../../../features/DashBoard/DashBoardSlice'
import Cell from '../Cell/Cell';

const Board = () => {
  const dispatch = useDispatch()
  // const [grid,setGrid]= useState([])
  const game = useSelector((state) => state.dashboard);
  const clickLocation = useSelector((state)=> state.dashboard.ClickLocation);
  // properties of cell
  const properites = {
    revealed: false,
    flagged: false,
    value: 0
  }

  // based on difficulty - we decide the size of our matrix
  // for easy 9*9. for medium 12*12. for hard 16*16
  const {size,flagsTotal, bombTotal,gameStarted} = game;

  
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

  const setvalInCell = (x,y,val) =>{
    const updatedMatrix = [...matrix]
    updatedMatrix[x][y]={
      ...matrix[x][y],
      value: val
    }
    dispatchMatrix({type:'SET_MATRIX',matrix:updatedMatrix})
  }
  const SetRevealCell = (matrix,x,y)=>{
    matrix[x][y]={
     ...matrix[x][y],
     revealed: true
   }
  }
/* placing bombs on the board */
/*we don't put a bomb where the user click and all his 8 neighbors!*/
const PlacingBombs = (clickLocation) =>{
    let CurrentBombs = bombTotal;
    let x,y;
    while(CurrentBombs > 0){
      x = Math.floor(Math.random()*(size-1))
      y = Math.floor(Math.random()*(size-1))
       if(matrix[x][y].value != 'x' && !NotAllowToHaveBomb(clickLocation[0],clickLocation[1],x,y) ){
        // put a bomb at random location on board if not exist
        setvalInCell(x,y,'x')
        // reduce number of bombs in 1
         CurrentBombs--
     }
  }
  UpdateMatBasedOnBombs()
  dispatch(setGameStart()) // set game to start
}

const NotAllowToHaveBomb =(xLocation,yLocation,x,y) =>{
  // make sure that [x,y] isnt the same location as [clickX,clickY] or neighbors
  if((x == xLocation || x-1 == xLocation || x+1 == xLocation) && (y == yLocation || y-1 == yLocation || y+1 == yLocation))
    return true;
  return false;
}
/* update matrix with numbers based on bombs  */
const UpdateMatBasedOnBombs =()=>{
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      // forEach on all my neighbors and count how many bombs we have around me
      if(matrix[i][j].value != 'x') 
        setvalInCell(i,j,countNeighborsBomb(i,j))
    }
  }
}
/* the function return true if the given [x,y] location is a bomb */
const IsYourNeighborBomb = ({x,y})=>{
  if(x >= 0 && x < size && y >= 0 && y < size){
    if(matrix[x][y].value == 'x') 
      return true;
  }
  return false;
}
 
/* return the numbers of bombs around me */
const countNeighborsBomb=(x,y)=>{
  //[(-1,-1), (-1,0) , (-1,1)
  // (0,-1), (0,0) , (0,1)
  //(+1,-1), (+1,0) , (+1,1)]
  let neighborsBomb = 0;
  for(let xAxis=-1;xAxis<=1;xAxis++){
    for(let yAxis=-1;yAxis<=1;yAxis++){
      if(xAxis == 0 && yAxis == 0) continue;
      if(IsYourNeighborBomb({x:x+xAxis,y:y+yAxis})) neighborsBomb++; // count bombs around me
    }
  }
  return neighborsBomb;
}

const FindBorderNeighbor = (x,y)=>{
  const updatedMatrix = [...matrix]
  for(let xAxis=-1;xAxis<=1;xAxis++){
    for(let yAxis=-1;yAxis<=1;yAxis++){
      if(isValidIndex(x,y,xAxis,yAxis)){
        if(matrix[x][y].value === 0) {
          SetRevealCell(updatedMatrix,x+xAxis,y+yAxis)
        }
     }
    }
  }
  dispatchMatrix({type:'SET_MATRIX',matrix:updatedMatrix})
}
/*Flood fill algorithm */
const RevealCells = (x, y) => {
  if (matrix[x][y].value !== 0 || matrix[x][y].revealed) return;
  for (let xAxis = -1; xAxis <= 1; xAxis++) {
    for (let yAxis = -1; yAxis <= 1; yAxis++) {
      if (isValidIndex(x,y,xAxis,yAxis)){
          SetRevealCell(matrix,x, y)
         RevealCells(x + xAxis, y + yAxis);
      }
    }
  }
   // reveal his neighbors - create for us a border of cells around the 0's cells
    FindBorderNeighbor(x,y);
}

const isValidIndex = (x,y,xAxis,yAxis)=>{
  return x + xAxis < size && x + xAxis >= 0 && y + yAxis < size && y + yAxis >= 0
}

useEffect(() => {
  if(clickLocation[0] != -1 && clickLocation[1] != -1){
    if(!gameStarted) PlacingBombs(clickLocation) // set matrix
    RevealCells(clickLocation[0], clickLocation[1])
  }
}, [clickLocation])

  return (
    <div className="Board-game">
      {matrix.map((row, rowIndex) => (
        <div key={`row-${rowIndex} row`}>
          {row.map((element, columnIndex) => (
            <Cell
            key={`${rowIndex}-${columnIndex}`}
            locationX={rowIndex}
            locationY={columnIndex} 
            matrix = {matrix}
            dispatchMatrix={dispatchMatrix}
             />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
