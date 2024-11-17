import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { AllProvider } from './context/AllContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AllProvider>
    <Router>
    <App />
    </Router>
    </AllProvider>
  </React.StrictMode>
);

