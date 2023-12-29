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

export const useOrder = () => {
  const {
    values: { collections },
  } = useFormikContext<{ collections: FormCollectionType[] }>()

  const order = [
    orderBacks,
    orderBaseCovers,
    orderFeet,
    orderLegs,
    orderShelves,
    orderSupports,
  ].map((fn) => fn(collections))

  return order
}
