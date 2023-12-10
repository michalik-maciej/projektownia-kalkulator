import { groupBy, map, sumBy } from "lodash/fp"

import { FormCollectionType, OrderType } from "../types"

export const orderFeet = (data: FormCollectionType[]): OrderType => {
  const mappedData = map(
    ({ depth, numberOfCollections, stands }) => ({
      depth,
      numberOfFeet: (sumBy("numberOfStands", stands) + 1) * numberOfCollections,
    }),
    data
  )

  const depthGroups = groupBy("depth", mappedData)

  return map((group) => {
    return {
      description: group[0].depth,
      number: sumBy("numberOfFeet", group),
    }
  }, depthGroups)
}
