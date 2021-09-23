import React, { useEffect, useState, } from 'react'
import { rtdb, } from '../../Firebase/config'
import Spinner from './../SingleComponents/Spinner';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AdminChat from './Chat/index'
import NoUsers from './../SingleComponents/NoUsers'

const AllUsers = () => {
    const [users, setUsers] = useState([])
    const [chatLoading, setloading] = useState(true)
    const [userChatAppId, setuserChatAppId] = useState('')

    useEffect(() => {
        let mounted = true
        const massgeDb = rtdb.ref('Messenger/')
        massgeDb.on('value', (shot) => {
            const allMessages = []
            const shotRef = shot.val()
            for (const userId in shotRef) {
                if (shotRef.hasOwnProperty.call(shotRef, userId)) {
                    for (const userChatId in shotRef[userId]) {
                        allMessages.push({ id: userId, ...shotRef[userId][userChatId] })
                    }
                }
            }
            if (allMessages.length !== 0) {
                const spacificUser = []
                const reducing = allMessages.filter(e => e.id === e.uid).reduce((previous, current) => {
                    const { id, photoURL, displayName, email } = current
                    previous[id] = { photoURL, displayName, email }
                    return previous
                }, {})
                for (const key in reducing) {
                    spacificUser.push({ id: key, ...reducing[key] })
                }
                if (mounted) setloading(false); setUsers(spacificUser)
            } if (allMessages.length === 0) {
                if (mounted) setloading(false); setUsers([])
            }
        })
        return () => {
            mounted = false
        }
    }, [])

    const handleChatApp = (e, id) => {
        e.preventDefault()
        setuserChatAppId(id)
    }

    if (chatLoading) {
        return <Spinner />
    }

    if (users.length === 0) {
        return <NoUsers />
    }

    return (
        <React.Fragment>
            <section className='my__admin__users lsjweslfjw'>
                <Container>
                    <main className="main__wrapper_users sljfwsdfw">
                        <div className="body_wrapper asdwejflksdaj">
                            {users.map(e => {
                                const { id, displayName, photoURL, email } = e
                                return (
                                    <div className="per_single" key={id}>
                                        <Link to={`/admin/single/user/${id}`} className='single_user_link' onClick={(e) => handleChatApp(e, id)} >
                                            <div className="img_container__">
                                                <img src={photoURL || '/img/user.png'} alt="" />
                                            </div>
                                            <div className="name_container">
                                                {displayName}
                                            </div>
                                            <div className="email_container">
                                                <span>{email} </span>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </main>
                </Container>
            </section>
            <AdminChat id={userChatAppId} setuserChatAppId={setuserChatAppId} />
        </React.Fragment>
    )
}

export default AllUsers
