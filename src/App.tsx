import { Dashboard } from "./pages/Dashboard";
import "./styles/global.scss"
import { Login } from "./pages/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { useEffect } from "react";
import { database } from "./services/firebase";

function App() {

  // const add = async () => {
  //   await database.ref(`companies/projects`).push({
  //     name: "Dewboard",
  //     tag: "DEW",
  //     totalHours: "X"
  //   })
  // }

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/dashboard" component={Dashboard}/>
      {/* <Route path="/rooms/:id" component={Room}/>
      <Route path="/admin/rooms/:id" component={AdminRoom}/> */}
    </Switch>
  </BrowserRouter>
  // <button onClick={add}>add</button>
  );
}

export default App;
