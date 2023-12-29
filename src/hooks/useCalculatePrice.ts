import { sumBy } from "lodash/fp"
import { useProductsList } from "../queries/useProductsList"
import { FormCollectionType } from "../types"
import {
  orderBacks,
  orderBaseCovers,
  orderFeet,
  orderLegs,
  orderShelves,
  orderSupports,
} from "../utils"

export const useCalculatePrice = (collections: FormCollectionType[]) => {
  const { data: products } = useProductsList()

  if (!products) return 0

  const price = [
    orderBacks,
    orderBaseCovers,
    orderFeet,
    orderLegs,
    orderShelves,
    orderSupports,
  ]
    .map((func) => sumBy("price", func(collections, products).orderDetails))
    .reduce((acc, curr) => acc + curr, 0)

  const formattedPrice = new Intl.NumberFormat("pl", {
    minimumFractionDigits: 2,
  }).format(price)

  return formattedPrice
}
