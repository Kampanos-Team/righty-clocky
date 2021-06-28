import Timer from "../components/Timer"
import TimeTable from "../components/TimeTable"
import { useAuth } from "../hooks/useAuth"
import Profile from "../Profile"

import "../styles/home.scss"

export function Home(){
  const { user, signInWithGoogle} = useAuth()

  async function handleLogin() {
    if(!user){
      await signInWithGoogle()
    }
    // history.push("/rooms/new")

  }
  return(
    <div id="page-auth">
      <aside>
        <TimeTable/>
      </aside>
      <main>
        <div className="main-content">
          <div>
            <button>Create Company</button>
          </div>
        </div>
      </main>
    </div>
  )
}