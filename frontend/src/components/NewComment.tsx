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

const NewComment = ({tweetId}: {tweetId: String}) => {

    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<Blob>()

    const { currentUser } = useSelector((state: RootState) => state.user);

    const handleComment = async () => {
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

                const submitComment = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comments`, {
                  userId: currentUser ? currentUser['_id'] : '',
                  tweetId: tweetId,
                  description: text,
                  image: imageUrl
                });

                console.log(submitComment)
                
                setText("")
                setLoading(false)

              } catch (err) {
                console.log(err);
              }
        }
        
    }

    return ( 
        <div className='newTweetContainer'>
            <textarea placeholder='Comment something'
            value={text}
            onChange={(e) => setText(e.target.value)}
            ></textarea>
            <input onChange = {(e) => {
                if (e.target && e.target.files)
                setFile(e.target.files[0])
            }} 
            type="file"></input>
            <button className="tweetButtonContainer" onClick = {handleComment}><div className='tweetButton'>{loading ? <CircularProgress /> : "Comment"}</div></button>
        </div>
    )
}

export default NewComment;