import firebase from "firebase"
// import 'firebase/firestore'
// import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDgzhhad_ww5YjFQhxIx5QIeL2UVNjky7Q",
    authDomain: "fishing-club-62cb2.firebaseapp.com",
    databaseURL: "https://fishing-club-62cb2.firebaseio.com",
    projectId: "fishing-club-62cb2",
    storageBucket: "fishing-club-62cb2.appspot.com",
    messagingSenderId: "116139461972",
    appId: "1:116139461972:web:0b4fa7432f533904350cc1",
    measurementId: "G-TX85VEE11W"
  })
}
const db = firebase.firestore()
//firebase.auth()にするとエラー出る
const auth = firebase.auth

export  { auth, db }
export default firebase