import { groupBy, map, sumBy, toString } from "lodash/fp"
import { FormCollectionType, OrderType } from "../types"
import { legs } from "../products"

export const orderLegs = (data: FormCollectionType[]): OrderType => {
  const mappedData = map(
    ({ stands, numberOfCollections, height }: FormCollectionType) => ({
      height,
      numberOfLegs: (sumBy("numberOfStands", stands) + 1) * numberOfCollections,
    }),
    data
  )

  const heightGroups = groupBy("height", mappedData)

  return map((group) => {
    const leg = legs.find(({ h }) => h === toString(group[0].height))

    return {
      description: `${leg?.h} / ${leg?.w} / ${leg?.d}`,
      number: sumBy("numberOfLegs", group),
    }
  }, heightGroups)
}
