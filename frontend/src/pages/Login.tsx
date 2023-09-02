import React from 'react';
import './Login.css';

import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import TwitterLogo from '../assets/twitter-logo.png';
import hiveLogo from '../assets/hive.png';
import { CircularProgress } from '@mui/material';

const Login = () => {

    const { currentUser } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        // if (currentUser) navigate("/home")
        // if (currentUser) 
    }, [])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
        setLoading(1)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signin`, { username, password });
        console.log(res.data)
        dispatch(loginSuccess(res.data));
        setLoading(0)
        // navigate("/home");
    } catch (err) {
        dispatch(loginFailed());
    }
    };

    const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
        setLoading(2)
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
        username,
        email,
        password,
        });
        console.log(res.data)
        dispatch(loginSuccess(res.data));
        setLoading(0)
        // navigate("/home");
    } catch (err) {
        dispatch(loginFailed());
    }
    };

    return ( 
        <div className='loginPage'>
            <div className='loginImageContainer'>
                <img src = {hiveLogo}></img>
            </div>

            <div className='loginFormContainer'>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>

                <div className='buttonContainer'>
                    <button onClick={handleLogin}>{loading==1 ? <CircularProgress /> : "Sign in"}</button>
                    <button onClick={handleSignup}>{loading==2 ? <CircularProgress /> : "Register"}</button>
                </div>
                <p><b>Note: </b>Sign in might take upto 1 minute, since Render free tier web services go to sleep after 15 minutes of inactivity.</p>
            </div>
        </div>
    )
}

export default Login;