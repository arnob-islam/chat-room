import React, { useEffect, useState, useRef, } from 'react'
import { auth, rtdb, } from '../../Firebase/config'
import Spinner from './../SingleComponents/Spinner';
import { FaTimes } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import { UseGlobalContext } from './../Provider/Anonymus'


const DefaultAdmin = [{
    id: "-MjwwpS1jc11QK2ZwJhsfasrewi",
    massage: "Please Login",
    photoURL: "/img/user.png",
    reply: "",
    uid: "alkjfli4 tdkfitjlkja",
}]


const Message = ({ openMessenger, setopenMessenger }) => {

    const { userisok } = UseGlobalContext()

    const [userAllMessage, setuserAllMessage] = useState([])
    const [chatLoading, setloading] = useState(true)

    const messagesEndRef = useRef(null)


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, []);
    useEffect(scrollToBottom, [userAllMessage]);




    useEffect(() => {
        if (!userisok) {
            setloading(false); setuserAllMessage(DefaultAdmin)
        }
        if (userisok) {
            const massgeDb = rtdb.ref('Messenger/').child(auth.currentUser.uid)
            massgeDb.on('value', (shot) => {
                const allMessages = []
                const shotRef = shot.val()
                for (const key in shotRef) {
                    if (shotRef.hasOwnProperty.call(shotRef, key)) {
                        allMessages.push({ id: key, ...shotRef[key] })
                    }
                }
                setloading(false); setuserAllMessage(allMessages)
            })
        }
    }, [userisok])


    if (chatLoading) {
        return <Spinner />
    }
    return (
        <aside className='brlt-1 full_box brrt-1'>
            <div className="title__wrappper">
                <div className='user_img_wrapper sldjkrvs'>
                    <div className="img-slweva">
                        <img src={auth.currentUser ? auth.currentUser.photoURL ? auth.currentUser.photoURL : '/img/unknown.png' : '/img/unknown.png'} className='img_container img__' alt="user" />
                    </div>
                    <div className="user__name">
                        <h5>
                            {auth.currentUser ? auth.currentUser.displayName : 'unknown user'}
                        </h5>
                    </div>
                </div>
                <div className="close_chat">
                    <IconButton aria-label="delete" className='no-padding' onClick={() => setopenMessenger(!openMessenger)} >
                        <FaTimes />
                    </IconButton>
                </div>
            </div>
            <div className={`read_massages`} >
                <div className="massagebox_container" >
                    <div className='message_sector'   >
                        {userAllMessage.length !== 0 ? userAllMessage.map(e => {
                            const { id, uid, massage, photoURL, media } = e
                            return <div className={userisok ? auth.currentUser.uid === uid ? `current_user common_` : `opposite_user common_` : ''} key={id} ref={messagesEndRef} >
                                <div className="message_row">
                                    <div className='img_container' >
                                        <img src={photoURL || '/img/user.png'} alt="user" className='img_container' />
                                    </div>
                                    <div className={'text_container'}>
                                        {massage && <p className={`userText_`}> {massage} </p>}
                                    </div>
                                </div>
                                {media && media.map((e, index) => {

                                    return <div className='media_container sdwrhw' key={index}>
                                        <img src={e} alt="" className='medial_lsiowkvjrsd' />
                                    </div>
                                })}
                            </div>
                        }) : ''}
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Message
