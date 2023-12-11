import { groupBy, map, sumBy } from "lodash/fp"

import { feet } from "../products"
import { FormCollectionType, OrderType } from "../types"

export const orderFeet = (data: FormCollectionType[]): OrderType => {
  const mappedData = map(({ depth, numberOfCollections, stands }) => {
    const [{ price: unitPrice }] = feet.filter(({ d }) => d === depth)
    const number = (sumBy("numberOfStands", stands) + 1) * numberOfCollections

    return {
      depth,
      number,
      price: number * unitPrice,
    }
  }, data)

  const depthGroups = groupBy("depth", mappedData)

  return map((group) => {
    return {
      description: group[0].depth,
      number: sumBy("number", group),
      price: sumBy("price", group),
    }
  }, depthGroups)
}
