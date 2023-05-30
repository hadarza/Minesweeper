import React,{useEffect} from 'react'
import {images} from '../../../constants/index'
import { useDispatch, useSelector } from 'react-redux'
import {ChangeDifficulty,ResetGame,setTimer} from '../../../features/DashBoard/DashBoardSlice'
const Menu = ({initialMatrix,dispatchMatrix}) => {
    const dispatch = useDispatch()
    const DashBoard = useSelector((state) => state.dashboard);
    const {Properties,level,gameStarted,flagsInUse,timer,gameOver} = DashBoard;
    var flagsTotal = Properties[level].flags

    // set Timer
    useEffect(() => {
        if(gameStarted){
            var interval = setInterval(() => {
                dispatch(setTimer())
            }, 1000);

            if(gameOver) clearInterval(interval)

            return () => {
            clearInterval(interval);
            };
        }
      }, [gameStarted,gameOver]);
    
    const setLevel = (level) =>{
        dispatch(ChangeDifficulty(level))
        setTimeout(() => {
            dispatch(ResetGame());
        }, 10);
    }

    useEffect(() => {
        dispatchMatrix({ type: 'SET_MATRIX', matrix: initialMatrix }); // at change level - size change so update our matrix
    }, [Properties[level].size])
    
  return (
    <div className='menu'>
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
            <p>{timer}</p>
        </div>
       
        <div className='flag-section'>
            <p className='flag-count'>מס' דגלים</p>
            <div className='flags-div'>
                <p>{flagsTotal-flagsInUse}</p>
                <div className='flag-img'><img src={images.flag}/></div>
            </div>
        </div>
    </div>
       
  )
}

export default Menu