import React,{useState,useEffect} from 'react'
import {images} from '../../constants/index'
import { useDispatch } from 'react-redux'
import { resetTimer } from '../../features/DashBoard/DashBoardSlice'

const Winner = () => {
  const [showWinner,setshowWinner] = useState(true) //show game over message after the delay of revealing the bombs

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetTimer())
  }, [])
  
  return (
    <>{showWinner &&
    <div className='msg-section'>
      <div className='section-winner'>
        <div className='img-final'>
          <img src={images.winner}/>
        </div>
        <button className='playAgain' onClick={()=>{
          // playAgain()
          setshowWinner(false)
        }}>תראה לכולם כמה טוב את/ה שוב!</button>
      </div>
      </div>
      }</>
    )
}

export default Winner