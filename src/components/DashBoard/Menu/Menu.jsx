import React,{useState,useEffect} from 'react'
import {images} from '../../../constants/index'

import { useSelector,useDispatch } from 'react-redux'

const Menu = () => {
    const [Timer, setTimer] = useState(0)

    const DashBoard = useSelector((state) => state.dashboard);
    const difficulty = DashBoard.difficulty; 

    useEffect(() => {
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);
    
  return (
    <div className='menu'>
        <div className='time-logo'>
            <div className='difficulty'>
                <p>קושי</p>
                <p>{difficulty}</p>
            </div>
                
            <div className='Time'>
                <p>טיימר</p>
                <p>{Timer}</p>
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