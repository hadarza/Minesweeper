import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cell from '../Cell/Cell';

const Board = () => {
  const difficulty = useSelector((state) => state.dashboard.difficulty);
  // based on difficulty - we decide the size of our matrix
  // for easy 9*9. for medium 12*12. for hard 16*16
  const size = {
    1: 9,
    2: 12,
    3: 16,
  };
  const sizeBoard = size[difficulty];
  var matrix = [];
  for (var i = 0; i < sizeBoard; i++) {
    matrix[i] = new Array(sizeBoard);
  }
  for(var i=0;i<sizeBoard;i++){
    for(var j=0;j<sizeBoard;j++){
      matrix[i][j] = 0;
    }
  }

  return (

    <div className="Board-game">
      {matrix.map((row, rowIndex) => (
        <div key={`row-${rowIndex} row`}>
          {row.map((element, columnIndex) => (
            <Cell key={`${rowIndex}-${columnIndex}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
