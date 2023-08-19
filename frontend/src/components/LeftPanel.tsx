import React from 'react';
import './LeftPanel.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { RootState } from '../redux/store';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';

const LeftPanel = () => {

    const { currentUser } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };

    return ( 
        <div className='leftPanel'>
            {/* <HouseIcon /> */}
            <div className='panelListWrapper'>
                <div><FontAwesomeIcon icon={faHouse} color='var(--twitter-blue)'/> Home</div>
                <div className="userMenuItem"><FontAwesomeIcon icon={faUser} color='var(--twitter-blue)'/> @{currentUser && currentUser['username']}</div>
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </div>
    )
}

export default LeftPanel;

