import { groupBy, map, sumBy, flatMap, size, filter } from "lodash/fp"

import { FormCollectionType, OrderType } from "../types"

export const orderFeet = (data: FormCollectionType[]): OrderType => {
  const group = groupBy("depth", data)

  const sum = map((group) => {
    const numberOfCollectionsByFoot = size(
      filter(["depth", group[0].depth], data)
    )

    return {
      description: group[0].depth,
      number:
        sumBy("numberOfStands", flatMap("stands", group)) +
        numberOfCollectionsByFoot,
    }
  }, group)

  return sum
}
