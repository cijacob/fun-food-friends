import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC0B0ugFjOtxLBlsf3PSWVQBLYJv271zRU",
  authDomain: "fun-food-friends-b68da.firebaseapp.com",
  databaseURL: "https://fun-food-friends-b68da.firebaseio.com",
  projectId: "fun-food-friends-b68da",
  storageBucket: "fun-food-friends-b68da.appspot.com",
  messagingSenderId: "1055662036570",
  appId: "1:1055662036570:web:2f9e1840dfdbf1400d2a63",
  measurementId: "G-JF8MP2NZ8Q"
};

firebase.initializeApp(config);

export default firebase;