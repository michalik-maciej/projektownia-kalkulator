import { useFormikContext } from "formik"

import { FormCollectionType } from "../types"
import {
  orderBacks,
  orderBaseCovers,
  orderFeet,
  orderLegs,
  orderShelves,
  orderSupports,
} from "../utils"
import { useProductsList } from "../queries/useProductsList"

export const useOrder = () => {
  const {
    values: { collections },
  } = useFormikContext<{ collections: FormCollectionType[] }>()
  const { data: products } = useProductsList()

  if (!products) return null

  const order = [
    orderBacks,
    orderBaseCovers,
    orderFeet,
    orderLegs,
    orderShelves,
    orderSupports,
  ].map((func) => func(collections, products))

  return order
}
