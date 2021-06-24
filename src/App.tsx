import { useContext } from "react";
import Timer from "./components/Timer";
import TimeTable from "./components/TimeTable";
import { authContext } from "./contexts/AuthContext";
import Profile from "./Profile";

import "./styles.css"

function App() {

  return (
    <div className="App">
      <h2>Hello Kampanos</h2>
      <Profile/>
      <Timer/>
      <TimeTable/>
    </div>
  );
}

export default App;
