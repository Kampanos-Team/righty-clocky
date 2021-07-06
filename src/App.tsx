import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Route, Switch} from "react-router-dom"

import "./styles/global.scss"
import { database } from "./services/firebase";


function App() {

  const add = async () => {
    await database.ref(`companies/projects`).push({
      name: "Provencial",
      tag: "PVZ",
      totalHours: "X"
    })
  }


  return (
    <>
     <Switch>
       <Route path="/" exact component={Login}/>
       <Route path="/dashboard" component={Dashboard}/>
     </Switch>
     {/* <button onClick={add}>add</button> */}
  </>
  );
}

export default App;
