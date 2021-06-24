import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TimerProvider } from './contexts/TimerContext';
import {AuthProvider} from "./contexts/AuthContext"

import "./services/firebase"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

