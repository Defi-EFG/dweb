import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyD-Mkk0VZgBBxQdvCZbMlF9W3eH7KhH2cs',
  authDomain: 'efg-contact.firebaseapp.com',
  databaseURL: 'https://efg-contact.firebaseio.com',
  projectId: 'efg-contact',
  storageBucket: 'efg-contact.appspot.com',
  messagingSenderId: '912450092323',
  appId: '1:912450092323:web:7c459ac482cfcc20f76096',
  measurementId: 'G-DL63H77ZXT'
}

export const db = firebase.initializeApp({ databaseURL: firebaseConfig.databaseURL }).database()
