import { sumBy } from "lodash/fp"

import { FormCollectionType, OrderType } from "../types"

import {
  orderBacks,
  orderBaseCovers,
  orderFeet,
  orderLegs,
  orderShelves,
  orderSupports,
} from "../utils"

export const calculatePrice = (data: FormCollectionType[]) => {
  const orderFunctions: Array<(data: FormCollectionType[]) => OrderType> = [
    orderLegs,
    orderBacks,
    orderBaseCovers,
    orderFeet,
    orderShelves,
    orderSupports,
  ]

  const totalSum = orderFunctions
    .map((func) => sumBy("price", func(data).orderDetails))
    .reduce((acc, curr) => acc + curr, 0)

  const formattedSum = new Intl.NumberFormat("pl", {
    minimumFractionDigits: 2,
  }).format(totalSum)

  return formattedSum
}
