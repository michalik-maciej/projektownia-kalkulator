import { sumBy } from "lodash/fp"

import { FormCollectionType, OrderType } from "../types"

import { orderLegs } from "./orderLegs"
import { orderBacks } from "./orderBacks"
import { orderFeet } from "./orderFeet"
import { orderSupports } from "./orderSupports"
import { orderShelves } from "./orderShelves"
import { orderBaseCovers } from "./orderBaseCovers"

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
    .map((func) => sumBy("price", func(data)))
    .reduce((acc, curr) => acc + curr, 0)

  const formattedSum = new Intl.NumberFormat("pl", {
    minimumFractionDigits: 2,
  }).format(totalSum)

  return formattedSum
}
