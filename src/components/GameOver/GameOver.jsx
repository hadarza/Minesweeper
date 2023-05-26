import React,{useState,useEffect} from 'react'
import {images} from '../../constants/index'
const GameOver = ({matrix,dispatchMatrix}) => {
    const [showOver,setShowOver] = useState(false) //show game over message after the delay of revealing the bombs
    useEffect(()=>{
        const updatedMatrix = [...matrix]
        let delay = 200;
        // reveal all the bombs!
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if(matrix[i][j].value == 'x'){
                    setTimeout(() => {
                    updatedMatrix[i][j]={
                        ...updatedMatrix[i][j],
                        revealed: true
                        }
                    dispatchMatrix({type:'SET_MATRIX',matrix:updatedMatrix})                   
                    }, delay);
                    delay+=100;
                }
            }
        }
        setTimeout(() => {
            setShowOver(true)
        }, 1500);
    },[matrix])
  return (
    <>
    {showOver &&
     <div className='page-gaveover'>
    <div className='section-gameover'>
        <div className='bomb'>
            <img src={images.bomb}/>
        </div>
        <div>


        <div className='Timer'>
            <img src={images.timer}/>
            <p>10</p>
        </div>    
        </div> 
        
        <div className='buttons-sectionGameOver'>
            <button className='tryAgain'>אני רוצה לנסות שוב </button>
        </div>
    </div>
    </div>}
    </>
   
  )
}

export default GameOver