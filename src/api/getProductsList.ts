import { collection, getDocs, getFirestore } from "firebase/firestore/lite"

import type { Products } from "../types"

export const getProductsList = async () => {
  const db = getFirestore()
  const query = await getDocs(collection(db, "products"))
  const [products] = query.docs.map((doc) => doc.data())

  return products as Products
}
