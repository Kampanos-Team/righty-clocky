import React, { useContext} from 'react';
import { timerContext } from '../../contexts/TimerContext';
import { useAuth } from '../../hooks/useAuth';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import playImg from "../../assets/images/play-button.svg"

import "./styles.scss"


const Timer: React.FC = () => {
  const {user, signInWithGoogle} = useAuth()

  //dentro de user esta os dados do usuario logado
  
  
  let time = 1

  //convert milliseconds to minutes, seconds, hours formula
  const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  const hours = `0${Math.floor(time / (1000 * 60 * 60)) % 24}`.slice(-2)
  // const timer = new Date(startTime).toString().slice(11, -1)


  const handleStartTimer = () => {
    //logica do timer
  }
  const writeStartTime = async () => {
    const e = Date.now()
    if(user){
      //write start time in database
    }
  };

  const writeEndTime = async () => {
    const e = Date.now()
    if(user){
      //write end time in database
    }
  }

  const percentage = 30;
  return (
    <div id="timer" style={{ width: 320, height: 320 }}>
      <CircularProgressbarWithChildren styles={{trail: {  strokeLinecap: 'butt'}, path:{strokeLinecap: 'butt'}}} className="progress-timer" strokeWidth={6} value={percentage}>
        <span>
        00: 00: 00
        <img onClick={handleStartTimer} src={playImg} alt="" />
        </span>
       
      </CircularProgressbarWithChildren>
    </div>
  );
}
export default Timer;