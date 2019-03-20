//https://firebase.google.com/docs/web/setup?authuser=0
//https://firebase.google.com/docs/reference/js/firebase.database?authuser=0
//https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0
//https://www.youtube.com/watch?v=v_hR4K4auoQ&list=PLl-K7zZEsYLluG5MCVEzXAQ7ACZBCuZgZ
//
//* is take all the named functions and call it firebase, its because it doesnt have
//a function as default
import * as firebase from 'firebase';

// Initialize Firebase 

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

//https://firebase.google.com/docs/reference/js/firebase.auth?authuser=0
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();



export { firebase, googleAuthProvider, database as default };