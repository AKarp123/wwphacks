import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

firebase.initializeApp({
    apiKey: "AIzaSyA8syYXAKfmC-vGFBVLyecRXUhQsuElNbo",

    authDomain: "karpwwphacks.firebaseapp.com",

    projectId: "karpwwphacks",

    storageBucket: "karpwwphacks.appspot.com",

    messagingSenderId: "791669491287",

    appId: "1:791669491287:web:a29bb728b83f8de51e0512",
});

/**
 * @returns Authentication service
 */
const auth = firebase.auth();
const db = firebase.firestore();
let functions = firebase.functions();

const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

const signOut = () => {
    auth.signOut();
};

export { signIn, signOut, auth, db, functions };
