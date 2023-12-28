import React from "react"
import ReactDOM from "react-dom/client"

import firebaseInit from "./firebaseInit"
import "./index.css"
import { App } from "./App"

firebaseInit()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
