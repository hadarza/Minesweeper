// import React,{useState,useEffect,useRef} from 'react'
// import {images} from '../../constants/index'
// import { useDispatch } from 'react-redux'
// import { resetTimer } from '../../features/DashBoard/DashBoardSlice'

// const Winner = ({initialMatrix,dispatchMatrix}) => {
//   const [showWinner,setshowWinner] = useState(true) //show game over message after the delay of revealing the bombs
//   const cells = document.querySelectorAll('.cell');
//   const dispatch = useDispatch()
//   const gameOverRef = useRef(false); // useRef to track game over status

//   useEffect(() => {
//     dispatch(resetTimer())
//       // disable to click on board
//       cells.forEach((cell) => {
//         cell.style.pointerEvents = 'none';
//       });

//   }, []);

//   // const playAgain = () => {
//   //   if (gameOverRef.current) {
//   //     return; // Return early if the game is already restarted
//   //   }
//   //   gameOverRef.current = true; // Set the game over status
//   //   setshowWinner(false)
//   //   dispatchMatrix({ type: 'SET_MATRIX', matrix: initialMatrix });
//   // }

// //   useEffect(() => {
// //     // // enable to click on board only after gaveOver set to true
// //     // if(gameOver){
// //     // cells.forEach((cell) => {
// //     //     cell.style.pointerEvents = 'auto';
// //     // }); 
// //     }
// // }, [gameOver])

//     // if (gameOverRef.current) {
//     //   return; // Return early if the game is already restarted
//     // }

//     // gameOverRef.current = true; // Set the game over status

//     // dispatch(ResetGame());
//     // dispatch(setGameOver(false));

//     // setTimeout(() => {
//     //   dispatchMatrix({ type: 'SET_MATRIX', matrix: initialMatrix });

//     // // enable to click on board
//     //   cells.forEach((button) => {
//     //     button.style.pointerEvents = 'auto';
//     //   });

//     //   gameOverRef.current = false; // Reset the game over status
//     // }, 500); 

//   return (
//     <>{showWinner &&
//     <div className='msg-section'>
//       <div className='section-winner'>
//         <div className='img-final'>
//           <img src={images.winner}/>
//         </div>
//         <button className='playAgain' onClick={()=>{}}>תראה לכולם כמה טוב את/ה שוב!</button>
//       </div>
//       </div>
//       }</>
//     )
// }

// export default Winner