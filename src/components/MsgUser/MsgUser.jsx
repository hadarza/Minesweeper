import React, { useState, useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import { ResetGame, setGameOver } from '../../features/DashBoard/DashBoardSlice';

const MsgUser = ({ initialMatrix , dispatchMatrix,title,img,altImg}) => {
  const {gameOver} = useSelector((state)=>state.dashboard)
    const [showGameOverMsg, setshowGameOverMsg] = useState(true); // show game over message after the delay of revealing the bombs
  const dispatch = useDispatch();
  const gameOverRef = useRef(false); // useRef to track game over status
  const cells = document.querySelectorAll('.cell');

  useEffect(() => {
    // disable to click on cells on GaveOver msg appear on screen
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
    setshowGameOverMsg(!showGameOverMsg)
}

  useEffect(() => {
        // enable to click on board only after gaveOver set to true
        if(gameOver){
        cells.forEach((cell) => {
            cell.style.pointerEvents = 'auto';
        }); 
    }
}, [gameOver])

  return (
    <>
      {showGameOverMsg && (
        <div className="msg-section">
          <div className="section-msg">
            <div className="img-final">
              <img src={img} alt={altImg} />
            </div>
            <button className="playAgain" onClick={playAgain}>
                {title}
            </button>
          </div>
        </div>)
    }
    </>
  );
};

export default MsgUser;
