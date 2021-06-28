import React from 'react';
import Timer from "../components/Timer"
import logo from "../assets/images/logo.svg"
import clockImg from "../assets/images/clock-icon.svg"
import avatar from "../assets/images/avatar.svg"
import playImg from "../assets/images/play-icon.svg"
import addTaskImg from "../assets/images/add-icon.svg"
import "../styles/dashboard.scss"


export function Dashboard(){
  return (
    <div id="dashboard">
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
            <button className="add-task-button">
              <img src={addTaskImg} alt="" />
              <span>add task</span>
              </button>
            <button className="start-timer-button">
              <img src={playImg} alt="play image" />
              <span>Start Time</span>
              </button>
            <button className="profile-button">
              <img src={avatar} alt="avatar" />
              <span>Name</span>
              <span>...</span>
            </button>
        </div>
      </header>
      
      <div className="banner">
        <div className="separator"></div>
        <div className="grid">
          <div className="banner-left">
              <div>
                <h1>Welcome back {"Username"}</h1>
                <p>It's the perfect time to start working {":)"}</p>
              </div>
              <div>
                <span>
                <strong>8 Hours </strong>
                left today
                </span>
                <span>
                <strong>424 Hours </strong>
                *Project X*
                </span>
              </div>
          </div>
          <div className="banner-right">
              <h2>424 Hours</h2>
              <p>*Project X*</p>
          </div>
          </div>
          </div>
          <main>
            <div className="timer-container">
                <Timer/>
            </div>
            <div className="task-container">
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
            </div>
          </main>
    </div>
  )
}

export default Dashboard;