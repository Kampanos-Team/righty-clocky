import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import "./styles/global.scss"
import { Login } from "./pages/Login";
import {BrowserRouter, Route, Switch} from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/dashboard" component={Dashboard}/>
      {/* <Route path="/rooms/:id" component={Room}/>
      <Route path="/admin/rooms/:id" component={AdminRoom}/> */}
    </Switch>
  </BrowserRouter>
    
  );
}

export default App;
