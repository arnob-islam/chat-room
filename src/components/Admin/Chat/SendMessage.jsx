import React, { useState } from 'react'
import { rtdb, storage } from './../../../Firebase/config'
import SendIcon from '@material-ui/icons/Send';
import MediaInfo from './Media/MediaInfo'
import UploadImages from './Media/UploadImages'

const SendMassage = ({ id }) => {

    const [userMessage, setuserMessage] = useState('')
    const [userMedia, setuserMedia] = useState({ name: [], file: [] })
    const [mediaLoading, setMediaLoading] = useState(0)
    const [buttondesable, setbuttondesable] = useState(false)
    const handleUserMessage = (e) => {
        setuserMessage(e.target.value);
    }

    const SEND_THE_MESSAGE = (e) => {
        e.preventDefault()

        if (id && userMessage) {
            const rtdbref = rtdb.ref(`Messenger/${id}`)
            rtdbref.push({
                massage: userMessage,
                uid: 'message_is_from_admin',
                photoURL: '/img/admin.png',
                displayName: 'admin',
                email: 'admin',
                media: []
            })
            setuserMessage('');
        }
        if (userMedia.name.length !== 0 && userMedia.file.length !== 0) {
            setbuttondesable(true)
            userMedia.file.forEach(file => {
                const storageRef = storage.ref(`Messenger/${id}`).child(file.name)
                storageRef.put(file).on('state_changed', (shot) => {
                    const uploadPercantage = (shot.bytesTransferred / shot.totalBytes) * 100
                    setMediaLoading(uploadPercantage)
                }, (err) => {
                    console.log(err)
                }, async () => {
                    const photoUrls = await storageRef.getDownloadURL()
                    const rtdbref = rtdb.ref(`Messenger/${id}`)
                    rtdbref.push({
                        massage: userMessage,
                        uid: 'message_is_from_admin',
                        photoURL: '/img/admin.png',
                        displayName: 'admin',
                        email: 'admin',
                        media: [photoUrls],
                    })
                    setuserMedia({ name: [], file: [] })
                    setMediaLoading(0)
                    setbuttondesable(false)

                })
            });

        }
    }

    return (
        <div className="write_massages bblr-1 bbrr-1">

            <MediaInfo userMedia={userMedia} setuserMedia={setuserMedia} mediaLoading={mediaLoading} />
            <form onSubmit={SEND_THE_MESSAGE} className='form__'>
                <UploadImages setuserMedia={setuserMedia} userMedia={userMedia} />
                <input className='input_fild' type="text" value={userMessage} placeholder='send massage...' onChange={handleUserMessage} />
                <button className="sent_btn" type='submit' disabled={buttondesable} >
                    <SendIcon className='sent_svg' />
                </button>
            </form>

        </div>
    )
}

export default SendMassage
