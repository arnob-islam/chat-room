import React, { useState, } from 'react'
import { auth, rtdb, storage } from '../../Firebase/config'
import SendIcon from '@material-ui/icons/Send';
import { UseGlobalContext } from './../Provider/Anonymus'
import UploadImages from './Media/UploadImages'
import MediaInfo from './Media/MediaInfo'
// import SetToStorage from './Media/SetToStorage'

const SendMassage = () => {

    const { userisok } = UseGlobalContext()
    const [userMessage, setuserMessage] = useState('')
    const [userMedia, setuserMedia] = useState({ name: [], file: [] })
    const [mediaLoading, setMediaLoading] = useState(0)

    const handleUserMessage = (e) => {
        setuserMessage(e.target.value);
    }

    const SEND_THE_MESSAGE = (e) => {
        e.preventDefault()

        if (userMessage && userisok) {
            const { uid, photoURL, displayName, email } = auth.currentUser
            const rtdbref = rtdb.ref(`Messenger/${uid}`)
            rtdbref.push({
                massage: userMessage,
                uid,
                photoURL,
                displayName,
                media: [],
                email,
            })
            setuserMessage('');
        }
        if (userisok && userMedia.name.length !== 0 && userMedia.file.length !== 0) {
            userMedia.file.forEach(file => {
                const storageRef = storage.ref(`Messenger/${auth.currentUser.uid}`).child(file.name)
                storageRef.put(file).on('state_changed', (shot) => {
                    const uploadPercantage = (shot.bytesTransferred / shot.totalBytes) * 100
                    setMediaLoading(uploadPercantage)
                }, (err) => {
                    console.log(err)
                }, async () => {
                    const photoUrls = await storageRef.getDownloadURL()

                    const { uid, photoURL, displayName, email } = auth.currentUser
                    const rtdbref = rtdb.ref(`Messenger/${uid}`)
                    rtdbref.push({
                        massage: userMessage,
                        uid,
                        photoURL,
                        displayName,
                        email,
                        media: [photoUrls],
                    })
                    setuserMedia({ name: [], file: [] })
                    setMediaLoading(0)
                })
            });

        }

        if (userMessage && !userisok) {
            alert('please log in')
        }
    }

    return (
        <div className="write_massages bblr-1 bbrr-1">

            <MediaInfo userMedia={userMedia} setuserMedia={setuserMedia} mediaLoading={mediaLoading} />

            <form onSubmit={SEND_THE_MESSAGE} className='form__'>

                <UploadImages setuserMedia={setuserMedia} userMedia={userMedia} />

                <input className='input_fild' type="text" value={userMessage} placeholder='send massage...' onChange={handleUserMessage} />
                <button className="sent_btn" type='submit' >
                    <SendIcon className='sent_svg' />
                </button>
            </form>

        </div>
    )
}

export default SendMassage
