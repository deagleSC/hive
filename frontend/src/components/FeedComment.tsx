import React from 'react';
import axios from 'axios';

import {useState, useEffect} from "react";
import './FeedTweet.css';

const FeedComment = ({comment} : {comment : any}) => {

    const [commentData, setCommentData] = useState<any>({})

    useEffect(() => {
        const getCommentUserName = async () => {
            let user = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/find/${comment.userId}`)
            let username = user.data.username
            comment = {...comment, username}
            console.log(comment)

            setCommentData(comment)
        }

        getCommentUserName()
    }, [])

  return (
    <div className='feedTweetContainer'>
        @<b>{commentData.username}</b><br></br>
        {comment?.description}
    </div>
  )
}

export default FeedComment