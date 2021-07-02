import React, { useContext} from 'react';
import { timerContext } from '../../contexts/TimerContext';
import { useAuth } from '../../hooks/useAuth';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import playImg from "../../assets/images/play-button.svg"
import pauseImg from "../../assets/images/pause-button.svg"

import "./styles.scss"
import { database } from '../../services/firebase';
import { useTask } from '../../hooks/useTask';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';


const Timer: React.FC = () => {
  const {user, signInWithGoogle} = useAuth()
  const {selectedTask, setTaskNotSelectedError} = useTask()
  const {isTimerOn, setIsTimerOn, writeStartTime, writeEndTime, formattedTime, timePercentage } = useTimer()

  //convert milliseconds to minutes, seconds, hours formula
  // const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  // const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  // const hours = `0${Math.floor(time / (1000 * 60 * 60)) % 24}`.slice(-2)
  // const timer = new Date(time).toISOString().substr(11, 8);
  // console.log(new Date("2021 09:27:23 GMT+0100 (Western European Standard Time)").getTime())
  
  const handleTimeCounter = () => {
    //logica do timer
  }


  return (
    <div id="timer" style={{ width: 320, height: 320 }}>
      <CircularProgressbarWithChildren
       styles={{trail: {  strokeLinecap: 'butt'}, path:{strokeLinecap: 'butt', transition: 'stroke-dashoffset 0.1s ease 0s'}}}
       className="progress-timer"
       strokeWidth={6}
       value={timePercentage}
       maxValue={60}
       >
        
        <span>
        {formattedTime ? formattedTime : "00:00:00"}
        {!isTimerOn ? (
          <img onClick={writeStartTime} src={playImg} alt="" />
        ):(
          <img onClick={writeEndTime} src={pauseImg} alt="" />
        )}
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
}
export default Timer;