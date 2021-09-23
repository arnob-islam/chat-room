import React, { useState } from 'react'
import SendMessage from './SendMessage';

import ReadMessages from './ReadMessages';
import './Chat.css'
import IconButton from '@mui/material/IconButton';

import { FaFacebookMessenger } from "react-icons/fa";
const App = () => {

    const [openMessenger, setopenMessenger] = useState(false)

    return (
        <>
            <IconButton aria-label="fingerprint" color="secondary" className='the_messanger_toggle_btn' onClick={() => setopenMessenger(!openMessenger)}>
                <FaFacebookMessenger />
            </IconButton>

            <main className={openMessenger ? 'open_messenger the_messenger' : 'the_messenger'}>
                <div className="wrapper">
                    <ReadMessages openMessenger={openMessenger} setopenMessenger={setopenMessenger} />
                    <SendMessage />

                </div>
            </main>
        </>
    )
}

export default App
