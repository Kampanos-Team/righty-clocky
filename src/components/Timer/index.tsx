import React, { useContext} from 'react';
import { authContext } from '../../contexts/AuthContext';
import { timerContext } from '../../contexts/TimerContext';

import "./styles.scss"


const Timer: React.FC = () => {
  const {time,handleStartTimer, handlePauseTimer, isTimeOn } = useContext(timerContext)
  const {user, signInWithGoogle} = useContext(authContext)
 
  const minutes = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  // const milliseconds = ("0" + ((time / 10) % 100)).slice(-2)
  const hours = `0${Math.floor(time / (1000 * 60 * 60)) % 24}`.slice(-2)
  // const timer = new Date(startTime).toString().slice(11, -1)

  function signIn() {
    if(!user){
      signInWithGoogle()
    }

  }
  return (
    <div id="timer">
      <div className="clock">
        <h2>Kampanos Clock</h2>
        <div className="display">
          <span>{hours}:</span>
          <span>{minutes}:</span>
          <span>{seconds}</span>
        </div>
      </div>
      <div className="buttons">
      {!user ? (
            <button onClick={signIn}>sign In With Google</button>
          ): (
            <div>
            {!isTimeOn && time === 0 && (
            <button onClick={handleStartTimer}>Start</button>
          )}
            {isTimeOn && <button onClick={handlePauseTimer}>Stop</button>}
          {!isTimeOn && time > 0 && (
            <button onClick={handleStartTimer}>Restart</button>
          )}
            {/* {!isTimeOn && time > 0 && (
            <button onClick={() => setIsTimeOn(true)}>Resume</button>
          )} */}
              </div>
          )}
      </div>
  </div>
  );
}
export default Timer;