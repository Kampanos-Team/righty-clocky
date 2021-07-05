import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Route, Switch} from "react-router-dom"

import "./styles/global.scss"


function App() {

  // const add = async () => {
  //   await database.ref(`companies/projects`).push({
  //     name: "Dewboard",
  //     tag: "DEW",
  //     totalHours: "X"
  //   })
  // }


  return (
    <>
     <Switch>
       <Route path="/" exact component={Login}/>
       <Route path="/dashboard" component={Dashboard}/>
     </Switch>
  </>
  );
}

export default App;
