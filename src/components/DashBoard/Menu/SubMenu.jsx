import React from 'react'
import {images} from '../../../constants/index'

const SubMenu = () => {
  return (
    <div className='submenu'>
        <div className='detailsSubMenu'>
            <div className='minesLeft'>
                <p>MINES LEFT</p>
                <p>10</p>
            </div>

            <div className='logo'>
                <img src={images.logo}/>
            </div>
            
            <div className='Time'>
                <p>TIME</p>
                <p>1000</p>
            </div>
        </div>
    </div>
  )
}

export default SubMenu