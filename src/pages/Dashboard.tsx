<<<<<<< HEAD
=======
import React, { useEffect } from 'react';
>>>>>>> 623ef6828751377f23569aafd2beb5573c348fa5
import Timer from "../components/Timer"
import logo from "../assets/images/logo.svg"
import clockImg from "../assets/images/clock-icon.svg"
import avatar from "../assets/images/avatar.svg"
import playImg from "../assets/images/play-icon.svg"
import addTaskImg from "../assets/images/add-icon.svg"
import "../styles/dashboard.scss"
import TaskList from "../components/TaskList"
import { useAuth } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';
import ellipsisIcon from "../assets/images/ellipsis-icon.svg"
import { useState } from 'react';
import ProfileButton from '../components/ProfileButton';
import toast, { Toaster } from 'react-hot-toast';

export function Dashboard(){
  const {user} = useAuth()
<<<<<<< HEAD
=======
  const {handleWriteNewTask} = useTask()

<<<<<<< HEAD
>>>>>>> 7ce17c24b9b884fd79b5e50d076a8b988e75914a
=======
  useEffect(() => {
    if(user){
      if(user?.name){
        toast(`Welcome ${user?.name}`)
      }else{
        toast(`Welcome`)
      } 
    }
>>>>>>> 623ef6828751377f23569aafd2beb5573c348fa5

  },[user])
  return (
    <div id="dashboard">
          <div><Toaster/></div>
      <aside>
        <img src={logo} alt="logo" />
        <div className="aside-buttons">
          <button className="selected">
            <img src={clockImg} alt="" />
          </button>
          <button>Calendar</button>
          <button>Coworkers</button>
        </div>
      </aside>
      <header>
        <div>
            <button onClick={handleWriteNewTask} className="add-task-button">
              <img src={addTaskImg} alt="" />
              <span>add task</span>
              </button>
            <button className="start-timer-button">
      
              <img src={playImg} alt="play image" />
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
                <span>
                <strong>8 Hours </strong>
                left today
                </span>
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