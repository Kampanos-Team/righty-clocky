import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useTimer } from '../../hooks/useTimer';
import playImg from "../../assets/images/play-button.svg"
import pauseImg from "../../assets/images/pause-button.svg"

import "./styles.scss"


const Timer: React.FC = () => {
  const {isTimerOn, formattedTime, timePercentage, handleEndTimer, handleStartTimer } = useTimer()
  //convert milliseconds to minutes, seconds, hours formula
  // const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  // const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  // const hours = `0${Math.floor(time / (1000 * 60 * 60)) % 24}`.slice(-2)
  // const timer = new Date(time).toISOString().substr(11, 8);
  // console.log(new Date("2021 09:27:23 GMT+0100 (Western European Standard Time)").getTime())

  return (
    <div id="timer" style={{ width: 320, height: 320 }}>
      <CircularProgressbarWithChildren
       styles={{trail: {  strokeLinecap: 'butt'}, path:{strokeLinecap: 'butt', transition: 'stroke-dashoffset 0.1s ease 0s'}}}
       className="progress-timer"
       strokeWidth={6}
       value={Number(timePercentage.toString().slice(-4))}
       maxValue={10000}
       >
        
        <span>
        {formattedTime ? formattedTime : "00:00:00"}
        {!isTimerOn ? (
          <img onClick={handleStartTimer} src={playImg} alt="start" />
        ):(
          <img onClick={handleEndTimer} src={pauseImg} alt="stop" />
        )}
        </span>
      </CircularProgressbarWithChildren>
    </div>
  );
}
export default Timer;