import React,{useState,useEffect} from 'react'
import {images} from '../../constants/index'
import { useDispatch } from 'react-redux'
import {ResetGame} from '../../features/DashBoard/DashBoardSlice'

const GameOver = ({matrix,dispatchMatrix}) => {
    const [showOver,setShowOver] = useState(false) //show game over message after the delay of revealing the bombs
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const updatedMatrix = [...matrix]
        let delay = 200;
        // reveal all the bombs!
        setTimeout(() => {

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
        }, 100);

        setTimeout(() => {
            setShowOver(true)

        }, 3000);
    },[])

    const playAgain = ()=>{
        dispatch(ResetGame())
        setShowOver(false)
    }
  return (
    <>
    {showOver &&
     <div className='msg-section'>
        <div className='section-gameover'>
            <div className='img-final'>
                <img src={images.bomb}/>
            </div>
            <button className='playAgain' onClick={playAgain}>אני רוצה לנסות שוב </button>
        </div>
    </div>}
    </>
   
  )
}

export default GameOver