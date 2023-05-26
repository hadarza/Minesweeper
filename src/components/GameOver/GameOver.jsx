import React,{useEffect} from 'react'
import {images} from '../../constants/index'
const GameOver = ({matrix,dispatchMatrix}) => {
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
    },[matrix])
  return (
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
    </div>
  )
}

export default GameOver