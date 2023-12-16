import { groupBy, map, sumBy } from "lodash/fp"

import { feet } from "../products"
import { FormCollectionType } from "../types"

export const orderFeet = (data: FormCollectionType[]) => {
  // Create a Map for constant time lookup of feet prices
  const feetPriceMap = new Map(feet.map(({ d, price }) => [d, price]))

  const depthGroups = groupBy("depth", data)

  return map((group) => {
    const depth = group[0].depth
    const unitPrice = feetPriceMap.get(depth) || 0
    const number = sumBy(
      ({ stands, numberOfCollections }) =>
        (sumBy("numberOfStands", stands) + 1) * numberOfCollections,
      group
    )

    return {
      description: depth,
      number,
      price: number * unitPrice,
    }
  }, depthGroups)
}
