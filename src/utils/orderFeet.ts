import {
  groupBy,
  map,
  flow,
  sumBy,
  flatMap,
  toString,
  size,
  filter,
} from "lodash/fp"
import { FormCollectionType } from "../types"
import { feet } from "../products"

type ResultItem = {
  description: string
  number: number
}

export const orderFeet = (data: FormCollectionType[]): ResultItem[] =>
  flow(
    groupBy<FormCollectionType>("foot"),
    map((group) => {
      const { foot } = group[0]
      const item = feet.find(({ d }) => d === toString(foot))

      if (!item) return null

      const numberOfCollectionsByFoot = size(filter(["foot", foot], data))

      return {
        description: `${item.d}`,
        number:
          sumBy("numberOfStands", flatMap("stands", group)) +
          numberOfCollectionsByFoot,
      }
    })
  )(data)
