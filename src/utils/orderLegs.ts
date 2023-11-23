import {
  groupBy,
  map,
  flow,
  sumBy,
  flatMap,
  toString,
  filter,
  size,
} from "lodash/fp"
import { FormCollectionType } from "../types"
import { legs } from "../products"

type ResultItem = {
  description: string
  number: number
}

export const orderLegs = (data: FormCollectionType[]): ResultItem[] =>
  flow(
    groupBy<FormCollectionType>("height"),
    map((group) => {
      const { height } = group[0]
      const leg = legs.find(({ h }) => h === toString(height))

      if (!leg) return null

      const numberOfCollectionsByHeight = size(filter(["height", height], data))

      return {
        description: `${leg.h} / ${leg.w} / ${leg.d}`,
        number:
          sumBy("numberOfStands", flatMap("stands", group)) +
          numberOfCollectionsByHeight,
      }
    })
  )(data)