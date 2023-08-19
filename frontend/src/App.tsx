import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <div className='appWrapper'>
    <div className="app">

      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
      </BrowserRouter>

    </div>
    </div>
  );
}

export default App;
