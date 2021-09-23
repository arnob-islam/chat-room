import React from 'react'
import ReadMessage from './ReadMessage'
import SendMessage from './SendMessage'
import './../../chat/Chat.css'

const Index = ({ id, setuserChatAppId }) => {



    return (
        <>
            <main className={id ? 'open_messenger the_messenger' : 'the_messenger'}>
                <div className="wrapper">
                    <ReadMessage id={id} setuserChatAppId={setuserChatAppId} />

                    <SendMessage id={id} />

                </div>
            </main>
        </>
    )
}

export default Index
