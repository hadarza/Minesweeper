import React, { useState, useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { images } from '../../constants/index';
import { ResetGame, setGameOver } from '../../features/DashBoard/DashBoardSlice';

const GameOver = ({ matrix, dispatchMatrix, initialMatrix }) => {
  const {gameOver} = useSelector((state)=>state.dashboard)
    const [showOver, setShowOver] = useState(true); // show game over message after the delay of revealing the bombs
  const dispatch = useDispatch();
  const gameOverRef = useRef(false); // useRef to track game over status
  const cells = document.querySelectorAll('.cell');

  useEffect(() => {
    const updatedMatrix = [...matrix];
    let delay = 200;

    // Reveal all the bombs!
    // setTimeout(() => {
    //   for (let i = 0; i < matrix.length; i++) {
    //     for (let j = 0; j < matrix[i].length; j++) {
    //       if (matrix[i][j].value === 'x') {
    //         setTimeout(() => {
    //           updatedMatrix[i][j] = {
    //             ...updatedMatrix[i][j],
    //           };
    //           dispatchMatrix({ type: 'SET_MATRIX', matrix: updatedMatrix });
    //         }, delay);
    //         delay += 100;
    //       }
    //     }
    //   }
    // }, 100);

    // disable to click on board
    cells.forEach((button) => {
      button.style.pointerEvents = 'none';
    });
    dispatch(ResetGame());

  }, []);

  const playAgain = () => {
    if (gameOverRef.current) {
      return; // Return early if the game is already restarted
    }

    gameOverRef.current = true; // Set the game over status

    dispatch(setGameOver(false));
    dispatchMatrix({ type: 'SET_MATRIX', matrix: initialMatrix });

  }

  useEffect(() => {
        // enable to click on board
        if(gameOver){
        cells.forEach((button) => {
            button.style.pointerEvents = 'auto';
        }); 
    }
  

  }, [gameOver])
  



  return (
    <>
      {showOver && (
        <div className="msg-section">
          <div className="section-gameover">
            <div className="img-final">
              <img src={images.bomb} alt="Bomb" />
            </div>
            <button className="playAgain" onClick={playAgain}>
              אני רוצה לנסות שוב
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameOver;
