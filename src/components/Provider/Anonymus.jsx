import React, { useEffect, createContext, useContext, useState } from 'react'
import { auth, db, } from '../../Firebase/config'

const AnonymusProvider = createContext()

const Anonymus = ({ children }) => {

    const [loading, setloading] = useState(true)
    const [userisok, setuserisok] = useState(false)

    const [globalAdmin, setglobalAdmin] = useState(false)


    const local = localStorage.getItem('admin')
    useEffect(() => {
        if (local === 'true') {
            setglobalAdmin(true)
        }
        if (!local) {
            setglobalAdmin(false)
        }
    }, [local])


    useEffect(() => {
        const subscribe = auth.onAuthStateChanged(user => {

            if (user) {
                let detailscarryer = []
                db.collection('users').get().then(snapshot => {
                    snapshot.forEach((doc) => {
                        detailscarryer.push(doc.data().mail)
                    });
                    if (detailscarryer) {
                        const exist = detailscarryer.some(e => e === user.email)
                        if (exist) {
                            setTimeout(() => {
                                setuserisok(true)
                                setloading(false)
                            }, 1500)
                        } else {
                            setuserisok(false)
                            setloading(false)
                        }
                    }
                }).catch(e => console.log(e))
            } else {
                setuserisok(false)
                setloading(false)
            }
        })
        return subscribe
    }, [])


    return (
        <AnonymusProvider.Provider value={{ loading, userisok, globalAdmin, setglobalAdmin }}>
            {children}
        </AnonymusProvider.Provider>
    )
}

export const UseGlobalContext = () => {
    return useContext(AnonymusProvider)
}

export default Anonymus
