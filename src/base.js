import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp  = firebase.initializeApp({
  apiKey: "AIzaSyD1hsJcG_8VrPK6tWEwD25mVw6PJ73AN50",
  authDomain: "pandemic-28cf9.firebaseapp.com",
  databaseURL: "https://pandemic-28cf9.firebaseio.com",
  projectId: "pandemic-28cf9",
  storageBucket: "pandemic-28cf9.appspot.com",
  messagingSenderId: "1071827373452",
  appId: "1:1071827373452:web:a0ed0c6994d5405c905aa9",
  measurementId: "G-DTSS2QYD07"
});

const auth = firebase.auth();

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp, auth };

export default base;
