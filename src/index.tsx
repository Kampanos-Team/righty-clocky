import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TimerProvider } from './contexts/TimerContext';
import {AuthProvider} from "./contexts/AuthContext"
import {TaskProvider} from "./contexts/TaskContext"

import "./services/firebase"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <TaskProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
    </TaskProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

