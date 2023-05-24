import React from 'react'
import Cell from '../DashBoard/Cell/Cell'
import Menu from '../DashBoard/Menu/Menu'
const Game = () => {
  return (
    <div className='game-page'>
        <Menu/>
        {/* dashboard */}
        <Cell/>
    </div>
  )
}

export default Game