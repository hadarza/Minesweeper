import React,{useState,useEffect} from 'react'
import {images} from '../../../constants/index'
import { useDispatch, useSelector } from 'react-redux'
import {ChangeDifficulty} from '../../../features/DashBoard/DashBoardSlice'
const Menu = () => {
    const dispatch = useDispatch()
    const [Timer, setTimer] = useState(0)
    const DashBoard = useSelector((state) => state.dashboard);
    const {Properties,level,gameStarted,flagsInUse} = DashBoard;
    var flagsTotal = Properties[level].flags

    // set Timer
    useEffect(() => {
        if(gameStarted){
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
    }
      }, [gameStarted]);
    
    const setLevel = (level) =>{
        dispatch(ChangeDifficulty(level))
    }
  return (
    <div className='menu'>
        <div className='time-logo'>
            <div className='difficulty'>
                <p>קושי</p>
                <select className="ul-level" onChange={(e)=>{setLevel(e.target.selectedIndex);}} >
                    {Properties.map((level,key)=>(
                          <option className="menu-item" key={key}>
                            {Properties[key].level}
                      </option>
                    ))}
                </select>
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
                <p className='flag-count'>מס' דגלים</p>
                <div className='flags-div'>
                    <p>{flagsTotal-flagsInUse}</p>
                    <div className='flag-img'><img src={images.flag}/></div>
                </div>

            </div>
            <div className='reset-section' onClick={()=>{}}>
                <p>איפוס</p>
                <div className='reset-img'><img src={images.reset}/></div>
            </div> 
        </div>
       
    </div>
  )
}

export default Menu