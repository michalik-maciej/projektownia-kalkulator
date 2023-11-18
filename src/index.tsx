import React from "react"
import { initializeApp } from "firebase/app"
import ReactDOM from "react-dom/client"

import "./index.css"
import { FormRoot } from "./components/FormRoot"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "halniak-group-app.firebaseapp.com",
  projectId: "halniak-group-app",
  storageBucket: "halniak-group-app.appspot.com",
  messagingSenderId: "811033651248",
  appId: "1:811033651248:web:06805c1ad0bc0439eaa5f5",
}

initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <FormRoot />
  </React.StrictMode>
)
