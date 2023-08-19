import React from 'react';
import './Home.css';

import LeftPanel from '../components/LeftPanel';
import Feed from '../components/Feed';
import RightPanel from '../components/RightPanel';
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import twitterLogo from '../assets/twitter-logo.png'
import githubLogo from '../assets/github-logo.png'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Home = () => {

    const { currentUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!currentUser || currentUser == undefined) navigate("/")
    // }, [])

    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };

    return ( 
        <div className='homeWrapper'>
        <div className='navbar'>
            <div>
            <img className = "navImage" src={twitterLogo} ></img>
            {/* <img className='navImage' src = {githubLogo} ></img> */}
            </div>

            <div>Hi, {currentUser && currentUser['username']}</div>
            <div><button onClick={handleLogout}>Sign out</button></div>
        </div>

        <div className='home'>   
            <LeftPanel />
            <Feed />
            <RightPanel />
        </div>
        </div>
    )
}

export default Home;