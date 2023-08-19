import React from 'react';
import './NewTweet.css';

import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

// declare var process : {
//     env: {
//       NODE_ENV: string
//     }
//   }

const NewTweet = () => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<Blob>()

    const { currentUser } = useSelector((state: RootState) => state.user);

    const handleTweet = async () => {
        if (currentUser) {
            try {

                setLoading(true)

                console.log(file)

                if (file) {
                    const formData = new FormData()
                    formData.append("file", file)
                    formData.append("upload_preset", "twitter-mini")

        

                    let api_key = process.env['REACT_APP_CLOUDINARY_API_KEY'] as string
                    formData.append("api_key", api_key)

                    let res = await axios.post(`https://api.cloudinary.com/v1_1/twitter-mini/image/upload`, formData)
                    var imageUrl = res.data.url
                }

                const submitTweet = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tweets`, {
                  userId: currentUser ? currentUser['_id'] : '',
                  description: text,
                  image: imageUrl
                });
                
                setText("")
                setLoading(false)

              } catch (err) {
                console.log(err);
              }
        }
        
    }

    return ( 
        <div className='newTweetContainer'>
            <textarea placeholder='Tweet something'
            value={text}
            onChange={(e) => setText(e.target.value)}
            ></textarea>
            <input onChange = {(e) => {
                if (e.target && e.target.files)
                setFile(e.target.files[0])
            }} 
            type="file"></input>
            <button className="tweetButtonContainer" onClick = {handleTweet}><div className='tweetButton'>{loading ? <CircularProgress /> : "Tweet"}</div></button>
        </div>
    )
}

export default NewTweet;