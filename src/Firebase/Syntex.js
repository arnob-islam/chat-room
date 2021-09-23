import { auth, googleProvider, facebookProvider, db } from "./config";
import { deleteUser } from "firebase/auth";

const LOGIN = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
}

const SIGNUP_WITH_EMAIL = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)

}

const FORGET_PASSWORD = (email) => {
    return auth.sendPasswordResetEmail(email)
}

const SET_USER_DATA_TO_STORAGE = (uid, details) => {
    auth.currentUser.updateProfile({
        displayName: details.name,
        photoURL: details.photoURL
    })
    return db.collection('users').doc(uid).set(details)
    // return rtdb.ref('/Users/SignUp').push(details)

}


const SIGN_WITH_GOOGLE = () => {
    return auth.signInWithPopup(googleProvider)
}
const SIGN_WITH_FACEBOOK = () => {
    return auth.signInWithPopup(facebookProvider)
}

const DELET_USER = (user) => {
    return deleteUser(user)
}


export { LOGIN, SIGNUP_WITH_EMAIL, SIGN_WITH_GOOGLE, SIGN_WITH_FACEBOOK, SET_USER_DATA_TO_STORAGE, FORGET_PASSWORD, DELET_USER }