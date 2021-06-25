import React from 'react';
import Timer from "../components/Timer"

import "../styles/dashboard.scss"


export function Dashboard(){
  return (
    <div id="dashboard">
      <aside>
        <img src="" alt="logo" />
        <div>Clock</div>
        <div>Calendar</div>
        <div>Coworkers</div>
      </aside>
      <nav>
            <div>New task</div>
            <div>Start Time</div>
            <div>Profile</div>
      </nav>
      <main>
          <div className="user-info">Hello Kampanos</div>
          <div className="grid">
            <div className="timer">
                <Timer/>
            </div>
            <div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
              <div>Task</div>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Dashboard;