import { Dashboard } from "./pages/Dashboard";
import "./styles/global.scss"
import { Login } from "./pages/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { useEffect } from "react";
import { database } from "./services/firebase";
import { CSVLink } from "react-csv";
import { useExport } from "./hooks/useExport";


function App() {
  const {headers, exportData} = useExport()

  // const add = async () => {
  //   await database.ref(`companies/projects`).push({
  //     name: "Dewboard",
  //     tag: "DEW",
  //     totalHours: "X"
  //   })
  // }

  return (
    <>
     <BrowserRouter>
     <Switch>
       <Route path="/" exact component={Login}/>
       <Route path="/dashboard" component={Dashboard}/>
     </Switch>
   </BrowserRouter>
  {/* <button onClick={getUserTimestamps}>add</button>

  <CSVLink data={exportData} headers={headers}>
  Download me
  </CSVLink> */}
  </>
  );
}

export default App;
