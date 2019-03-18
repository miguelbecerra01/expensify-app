//* is take all the named functions and call it firebase, its because it doesnt have
//a function as default
import * as firebase from 'firebase';

// Initialize Firebase 

const config = {
    apiKey: "AIzaSyBlATvcxT5TS_NB8Gv62ZlFmQ4x-4jbefY",
    authDomain: "expensify-a035a.firebaseapp.com",
    databaseURL: "https://expensify-a035a.firebaseio.com",
    projectId: "expensify-a035a",
    storageBucket: "expensify-a035a.appspot.com",
    messagingSenderId: "1039097332036"
};

firebase.initializeApp(config);


//Store to the Real Time Database
firebase.database().ref().set({
    name: 'Miguel Becerra'
});

