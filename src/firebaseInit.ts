// import { getFirestore, setDoc, doc } from "firebase/firestore/lite"
import { initializeApp } from "firebase/app"
// import { products } from "./products/products"

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

  // setDoc(doc(getFirestore(), "products", "catalog"), products)
}

export default setup
