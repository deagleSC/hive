import React from 'react';
import NewTweet from './NewTweet';
import './Feed.css';
import FeedTweet from './FeedTweet';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RightPanelMobile from '../components/RightPanelMobile';
import { CircularProgress } from '@mui/material';

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

const Feed = () => {

    const [timeLine, setTimeLine] = useState<any[]>();
    const [loading, setLoading] = useState(false)

    const { currentUser } = useSelector((state: RootState) => state.user);


    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true)
            if (currentUser) {
                const timelineTweets = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/tweets/timeline/${currentUser['_id']}`
            );
    
            setTimeLine(timelineTweets.data);
            // console.log(timelineTweets.data);

            setLoading(false)
            }
          } catch (err) {
            console.log("error", err);
          }
        };
    
        fetchData();
      }, []);

    return ( 
        <div className='feedContainer'>
            <div className='rightPanelMobile'><RightPanelMobile /></div>
            <NewTweet />

            <div className='feedTweetsContainer'>

            {loading && <div className='loading'><CircularProgress /></div>}

            {timeLine && !loading && timeLine.map((tweetData: TweetProps) => (
                <FeedTweet tweet={tweetData}/>
            ))}
            </div>
        
        </div>
    )
}

export default Feed;