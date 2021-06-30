import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TimerProvider } from './contexts/TimerContext';
import {AuthProvider} from "./contexts/AuthContext"
import {CompanyProvider} from "./contexts/CompanyContext"
import {TaskProvider} from "./contexts/TaskContext"

import "./services/firebase"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <TaskProvider>
    <TimerProvider>
    <CompanyProvider>
      <App />
    </CompanyProvider>
    </TimerProvider>
    </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

