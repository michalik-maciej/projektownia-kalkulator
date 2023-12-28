import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "halniak-group-app.firebaseapp.com",
  projectId: "halniak-group-app",
  storageBucket: "halniak-group-app.appspot.com",
  messagingSenderId: "811033651248",
  appId: "1:811033651248:web:06805c1ad0bc0439eaa5f5",
}

const setup = () => {
  initializeApp(firebaseConfig)
}

export default setup
