import React from 'react'
import {images} from '../../constants/index'
import { useDispatch } from 'react-redux'
import {ResetGame} from '../../features/DashBoard/DashBoardSlice'

const Winner = () => {
  const dispatch = useDispatch()
  return (
    <div className='msg-section'>
      <div className='section-winner'>
        <div className='img-final'>
          <img src={images.winner}/>
        </div>
        <button className='playAgain' onClick={()=>{dispatch(ResetGame())}}>תראה לכולם כמה טוב את/ה שוב!</button>
      </div>
      </div>

    )
}

export default Winner