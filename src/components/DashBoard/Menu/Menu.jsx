import React from 'react'
import {images} from '../../../constants/index'
const Menu = () => {
  return (
    <div className='menu'>
        <div className='time-logo'>
            <div className='difficulty'>
                <p>קושי</p>
                <p>קל</p>
            </div>
                
            <div className='Time'>
                <p>טיימר</p>
                <p>1000</p>
            </div>
        </div>
       

        <div className='logo'>
            <img src={images.logo}/>
        </div>

        <div className='container-flag-reset'>
            <div className='flag-section'>
                <p>מס' דגלים</p>
                <div className='div-img'><img src={images.flag}/></div>
            </div>
            <div className='reset-section'>
                <p>איפוס</p>
                <div className='div-img'><img src={images.reset}/></div>
            </div> 
        </div>
       
    </div>
  )
}

export default Menu