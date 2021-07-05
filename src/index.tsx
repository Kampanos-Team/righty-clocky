import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TimerProvider } from './contexts/TimerContext';
import {AuthProvider} from "./contexts/AuthContext"
import {TaskProvider} from "./contexts/TaskContext"
import {BrowserRouter, Route, Switch} from "react-router-dom"

import "./services/firebase"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <AuthProvider>
        <TaskProvider>
        <TimerProvider>
          <App />
        </TimerProvider>
        </TaskProvider>
        </AuthProvider>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

