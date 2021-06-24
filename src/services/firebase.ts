import firebase from "firebase/app"

//import all services that will be used in firebase app
import "firebase/auth"
import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//values are temporary and must be moved to environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDC7KA2noXu6kq7pSZBAKIXy3nP6Cpvvr0",
  authDomain: "kampanos-clock.firebaseapp.com",
  databaseURL: "https://kampanos-clock-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kampanos-clock",
  storageBucket: "kampanos-clock.appspot.com",
  messagingSenderId: "770949843836",
  appId: "1:770949843836:web:9c62a95d54335080dd72f9",
  measurementId: "G-7TVB2F84R7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
 const database = firebase.firestore()

export {firebase, auth, database}