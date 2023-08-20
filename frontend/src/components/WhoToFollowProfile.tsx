import React from 'react';
import './WhoToFollowProfile.css';
import {useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { following } from "../redux/userSlice";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const WhoToFollowProfile = ({username, userId} : {username: string, userId: string}) => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.user);

    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        if (currentUser) {
            let followingArray = currentUser['following']
            if ((followingArray as string[]).includes(userId)) setFollowed(true)
        }
        // if (currentUser && currentUser.following.includes[])
    }, [])


    const handleFollow = async () => {
        if (currentUser) {

            if (currentUser['_id'] == userId) {
                alert("You cannot follow yourself")
                return
            }

            if (!((currentUser['following'] as string[]).includes(userId))) {
                try {
                  const follow = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/follow/${userId}`, {
                    id: currentUser ? currentUser['_id'] : ''
                  });
                  dispatch(following(userId));
                //   alert("User Followed")
                } catch (err) {
                  console.log("error", err);
                }
              } else {
                try {
                  const unfollow = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/unfollow/${userId}`, {
                    id: currentUser ? currentUser['_id'] : ''
                  });
          
                  dispatch(following(userId));
                //   alert("User unfollowed")
                } catch (err) {
                  console.log("error", err);
                }
              }

            setFollowed(!followed)
        }
        
      };

    return (
        <div className={followed ? 'profileWrapperFollowed' : 'profileWrapper'}
        onClick={handleFollow}
        >
            <span>@{username}</span>&nbsp; &nbsp;
            {followed && <span><FontAwesomeIcon className="tweetControl"icon={faCheck} color='lightgreen'/></span>}
        </div>
    )
} 

export default WhoToFollowProfile;