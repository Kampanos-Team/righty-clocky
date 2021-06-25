import Timer from "../components/Timer"
import TimeTable from "../components/TimeTable"
import Profile from "../Profile"

import "../styles/home.scss"

export function Home(){

  return(
    <div id="page-auth">
      <aside>
        <TimeTable/>
      </aside>
      <main>
        <div className="main-content">
          <Profile/>
          <Timer/>
        </div>
      </main>
    </div>
  )
}