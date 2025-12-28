import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // Only import BrowserRouter
import { Routes, Route } from 'react-router-dom';   // Import Routes and Route

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Routes>
        <Route path="/" element={<App />} />
      </Routes> */}
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);