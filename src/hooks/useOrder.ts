import { useFormikContext } from "formik"

import { FormCollectionType } from "../types"
import {
  orderBacks,
  orderBaseCovers,
  orderFeet,
  orderProfiles,
  orderShelves,
  orderSupports,
} from "../utils/order"
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
    orderProfiles,
    orderShelves,
    orderSupports,
  ].map((func) => func(collections, products))

  return order
}
