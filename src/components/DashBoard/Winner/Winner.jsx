import React from 'react'
import {images} from '../../../constants/index'
const Winner = () => {
  return (
    <div className='msg-section'>
      <div className='section-winner'>
        <div className='img-final'>
          <img src={images.winner}/>
        </div>
        <button className='playAgain'>תראה לכולם כמה טוב את/ה שוב!</button>
      </div>
      </div>

    )
}

export default Winner