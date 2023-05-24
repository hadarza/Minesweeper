import React from 'react'
import {images} from '../../../constants/index'
import SubMenu from './SubMenu'
const Menu = () => {
  return (
    <div className='menu'>
        <div>
            <div className='difficulty'>
                <p>DIFFICULTY</p>
            </div>
        </div>

        <SubMenu/>

        <div className='flag-reset'>
            <div className='flag-section'>
                <p>FLAG</p>
                <img src={images.flag}/>
            </div>
            <div className='reset-section'>
                <p>RESET</p>
                <img src={images.reset}/>
            </div>
        </div>
    </div>
  )
}

export default Menu