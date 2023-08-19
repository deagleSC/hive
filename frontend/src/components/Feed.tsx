import React from 'react';
import NewTweet from './NewTweet';
import './Feed.css';
import FeedTweet from './FeedTweet';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RightPanelMobile from '../components/RightPanelMobile';

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

    const { currentUser } = useSelector((state: RootState) => state.user);


    useEffect(() => {
        const fetchData = async () => {
          try {
            if (currentUser) {
                const timelineTweets = await axios.get(
              `${process.env.REACT_APP_BACKEND_URL}/tweets/timeline/${currentUser['_id']}`
            );
    
            setTimeLine(timelineTweets.data);
            // console.log(timelineTweets.data);
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
            {timeLine && timeLine.map((tweetData: TweetProps) => (
                <FeedTweet tweet={tweetData}/>
            ))}
            </div>
        
        </div>
    )
}

export default Feed;