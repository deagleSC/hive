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

const Login = () => {

    const { currentUser } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (currentUser) navigate("/home")
    }, [])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
        const res = await axios.post("/auth/signin", { username, password });
        console.log(res.data)
        dispatch(loginSuccess(res.data));
        navigate("/home");
    } catch (err) {
        dispatch(loginFailed());
    }
    };

    const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
        const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
        });
        console.log(res.data)
        dispatch(loginSuccess(res.data));
        navigate("/home");
    } catch (err) {
        dispatch(loginFailed());
    }
    };

    return ( 
        <div className='loginPage'>
            <div className='loginImageContainer'>
                <img src = {TwitterLogo}></img>
            </div>

            <div className='loginFormContainer'>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>

                <div className='buttonContainer'>
                    <button onClick={handleLogin}>Sign in</button>
                    <button onClick={handleSignup}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Login;