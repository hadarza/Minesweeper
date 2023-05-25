import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setGameStart} from '../../../features/DashBoard/DashBoardSlice'
import Cell from '../Cell/Cell';

const Board = () => {
  const dispatch = useDispatch()
  const [grid,setGrid]= useState([])
  const game = useSelector((state) => state.dashboard);
  const clickLocation = useSelector((state)=> state.dashboard.ClickLocation);
  // properties of cell
  const properites = {
    revealed: false,
    flagged: false,
    value: '0'
  }

  // based on difficulty - we decide the size of our matrix
  // for easy 9*9. for medium 12*12. for hard 16*16

  const {size,flagsTotal, bombTotal,gameStarted} = game;
  /* initalize the board to size base on difficulty */
  var matrix = [];
  for (var i = 0; i < size; i++) {
    matrix[i] = new Array(size);
  }
  /* create empty matrix */
  for(var i=0;i<size;i++){
    for(var j=0;j<size;j++){
      matrix[i][j] = properites;
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
         matrix[x][y]={
          ...matrix[x][y],
          value: 'x'
         }
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
      if(matrix[i][j].value != 'x' ) 
      matrix[i][j]={
        ...matrix[i][j],
        value: countNeighborsBomb(i,j)
       }
    }
  }
  setGrid(matrix)
}
/* the function return true if the given [x,y] location is a bomb */
const IsYourNeighborBomb = ({x,y})=>{
  if(x >= 0 && x< size && y >= 0 && y < size){
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
      // count bombs around me
      if(IsYourNeighborBomb({x:x+xAxis,y:y+yAxis})) neighborsBomb++;
    }
  }
  return neighborsBomb;
}

const RevealCells =() =>{
  FindZeroNeighbor( clickLocation[0], clickLocation[1])
}

const FindBorderNeighbor = (x,y)=>{
  for(let xAxis=-1;xAxis<=1;xAxis++){
    for(let yAxis=-1;yAxis<=1;yAxis++){
      if(isValidIndex(x,y,xAxis,yAxis)){
        if(matrix[x][y].value == 0){
          matrix[x+xAxis][y+yAxis].revealed = true;
        }
     }
    }
  }
  
}
/*Flood fill algorithm */
const FindZeroNeighbor = (x, y) => {
  if (matrix[x][y].value !== 0 || matrix[x][y].revealed) {
    return;
  }
  for (let xAxis = -1; xAxis <= 1; xAxis++) {
    for (let yAxis = -1; yAxis <= 1; yAxis++) {
      if (isValidIndex(x,y,xAxis,yAxis)) {
          matrix[x][y].revealed = true;
          FindZeroNeighbor(x + xAxis, y + yAxis);
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
    if(!gameStarted){
      PlacingBombs(clickLocation) // set matrix
    }
    RevealCells()
  }
}, [clickLocation])

  return (
    <div className="Board-game">
      {matrix.map((row, rowIndex) => (
        <div key={`row-${rowIndex} row`}>
          {row.map((element, columnIndex) => (
            <Cell
            locationX={rowIndex}
            locationY={columnIndex} 
            grid={grid}
            key={`${rowIndex}-${columnIndex}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
