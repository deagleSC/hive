import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App = () => {

  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className='appWrapper'>
    <div className="app">

      <BrowserRouter>
      <Routes>

        <Route path="/" element={currentUser ? <Home /> : <Login />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
      </Routes>
      </BrowserRouter>

    </div>
    </div>
  );
}

export default App;
