import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Timer from "../components/Timer"
import logo from "../assets/images/logo.svg"
import clockImg from "../assets/images/clock-icon.svg"
import playImg from "../assets/images/play-icon.svg"
import addTaskImg from "../assets/images/add-icon.svg"
import TaskList from "../components/TaskList"
import { useAuth } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';
import { useTimer } from '../hooks/useTimer';
import ProfileButton from '../components/ProfileButton';

import "../styles/dashboard.scss"

export function Dashboard(){
  const {user} = useAuth()
  const {handleOpenNewTaskForm} = useTask()
  const {handleStartTimer} = useTimer()


  useEffect(() => {
    if(user){
      if(user?.name){
        toast(`Welcome ${user?.name}`)
      }else{
        toast(`Welcome`)
      } 
    }
  },[user])

  if(!user){
    return(
      <div>
      </div>
    )
  }
  return (
    <div id="dashboard">
          <div><Toaster/></div>
      <aside>
        <img src={logo} alt="logo" />
        <div className="aside-buttons">
          <button className="selected">
            <img src={clockImg} alt="clock section" />
          </button>
          {/* <button>Calendar</button>
          <button>Coworkers</button> */}
        </div>
      </aside>
      <header>
        <div>
            <button onClick={handleOpenNewTaskForm} className="add-task-button">
              <img src={addTaskImg} alt="add task" />
              <span>add task</span>
              </button>
            <button onClick={handleStartTimer} className="start-timer-button">
      
              <img src={playImg} alt="start" />
              <span>Start Time</span>
              </button>
            <ProfileButton/>
        </div>
      </header>
      
      <div className="banner">
        <div className="separator"></div>
        <div className="grid">
          <div className="banner-left">
              <div>
                <h1>Welcome back {user?.name},</h1>
                <p>It's the perfect time to start working {":)"}</p>
              </div>
              <div>
                {/* <span>
                <strong>8 Hours </strong>
                left today
                </span> */}
                {/* <span> */}
                {/* <strong>424 Hours </strong>
                *Project X*
                </span> */}
                </div>
              </div>
          {/* <div className="banner-right">
              <h2>424 Hours</h2>
              <p>*Project X*</p>
          </div> */}
          </div>
          </div>
          <main>
            <div className="task-list-container">
            <TaskList/>
            </div>
            <Timer/>
          </main>
    </div>
  )
}

export default Dashboard;