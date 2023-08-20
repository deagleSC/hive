import React from 'react';
import './FeedTweet.css';

import {useState, useEffect} from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import CircularProgress from '@mui/material/CircularProgress';
import formatDistance from "date-fns/formatDistance";

interface TweetProps extends Object{
    createdAt: string, 
    description: string,
    likes: string[],
    updatedAt: string,
    userId: string, 
    _id: string,
    username: string,
    image: string
}

const FeedTweet = ({tweet}: {tweet: TweetProps}) => {
    
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [text, setText] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [hide, setHide] = useState(false)
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    const { currentUser } = useSelector((state: RootState) => state.user);

    const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

    useEffect(() => {
        // console.log(tweet['_id'])

        const getUserName = async () => {
            let temp = tweet
            
            
            // console.log(`/users/find/${tweet['userId']}`)
            let name = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/find/${tweet['userId']}`)
            // console.log(name.data.username)
            setUsername(name.data.username)
            setLikesCount(tweet.likes.length)
        }

        getUserName()
        setText(tweet.description)
        if (tweet.image) setImage(tweet.image)
        // if (currentUser) console.log(currentUser['username'])

        if (currentUser && tweet.likes.includes(currentUser['_id'])) setLiked(true)

    }, [])

    const handleDelete = async () => {
        // console.log(tweet._id)
        
        try {
            const deletedTweet = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tweets/delete/${tweet._id}`, {data : {
                id: currentUser ? currentUser['_id'] : ''
            }})

            setHide(true)

            //debug
            console.log(deletedTweet)

        } catch (err) {
            console.log(err)
        }
    }

    const handleEdit = async () => {
        try {
            setLoading(true)

            const updatedTweet = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tweets/edit/${tweet._id}`, {
                text: text
            })            
            setLoading(false)
            setEditMode(false)
            


        } catch(err) {
            console.log(err)
        }
    }

    const handleLike = async () => {
        try {
            const likedTweet = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tweets/${tweet['_id']}/like`, {
                id: currentUser ? currentUser['_id'] : ''
            })

            console.log(likedTweet)

            setLiked(!liked)
            setLikesCount(liked ? likesCount - 1 : likesCount + 1)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        !hide ? 
        <div key = {tweet._id} className='feedTweetContainer'>
            <b>@{username}</b> . {dateStr}
            {editMode? 
            <div className='editWrapper'>

                <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                <button onClick={handleEdit}>{loading ? <CircularProgress /> : "Confirm"}</button>
            </div>
            : <div>{text}</div>}

            {tweet.image && <img className="tweetImage" src={tweet.image} />}

            <div className='tweetControlsWrapper'>
            <span onClick={handleLike}><FontAwesomeIcon className="tweetControl" icon={faHeart} color={liked ? 'red' : 'white'}/> &nbsp;{likesCount}</span>

                {currentUser && currentUser['username'] == username && <>
                <span onClick={(() => setEditMode(true))}><FontAwesomeIcon className="tweetControl" icon={faPen} color='white'/></span>
                <span onClick={handleDelete}><FontAwesomeIcon className="tweetControl"icon={faTrash} color='white'/></span>
                </>}

            </div>
        </div>
        :
        <div></div>
    )
}

export default FeedTweet;