import React, { useContext} from 'react';
import { timerContext } from '../../contexts/TimerContext';
import { useAuth } from '../../hooks/useAuth';


import "./styles.scss"


const Task = ({isActive = false}: any) => {
  const {time,handlePauseTimer, isTimeOn } = useContext(timerContext)
  const {user, signInWithGoogle} = useAuth()
  
  const percentage = 30;
  return (
    <div className="task">
      <div>
      <button>...</button>
      <p><strong>Task #02</strong> - Make Design System</p>
    </div>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM1.81766 9C1.81766 12.9667 5.0333 16.1823 9 16.1823C12.9667 16.1823 16.1823 12.9667 16.1823 9C16.1823 5.0333 12.9667 1.81766 9 1.81766C5.0333 1.81766 1.81766 5.0333 1.81766 9Z" fill="#5F4F87"/>
        {isActive && (<circle cx="9" cy="9" r="4" fill="#5F4F87"/>)}
      </svg>
    </div>
  );
}
export default Task;