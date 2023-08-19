import React from 'react';
import './RightPanelMobile.css';

import WhoToFollowProfile from './WhoToFollowProfile';
import {useState, useEffect} from 'react';
import axios from 'axios';



const RightPanelMobile = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {

        const getUsers = async () => {
            const users = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/findall`)
            // console.log(users.data)
            setUsers(users.data)
        }

        getUsers()

    }, [])
    

    return ( 
        <div className='rightPanelMobile'>
        <div className='whoToFollowWrapper'>
            <b>Who to follow</b>

            {users && users.map((user) => (
                // <div>{user['username']}</div>
                <WhoToFollowProfile username = {user['username']} userId = {user['_id']}/>
            ))}

        </div>
        </div>
    )
}

export default RightPanelMobile;