import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MASSAGEING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
})

const auth = app.auth()
const db = app.firestore()
const rtdb = app.database()
const storage = app.storage()

const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

const StapmTime = firebase.firestore.FieldValue.serverTimestamp


export { auth, googleProvider, facebookProvider, db, StapmTime, storage, rtdb, firebase }

// export default firebase