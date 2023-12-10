import { orderBy, toNumber } from "lodash/fp"
import { groupBy, map, flatMap, sumBy } from "lodash/fp"

import { FormCollectionType, FormStandType, OrderType } from "../types"

import { getBacks } from "./getProducts"

export const aggregateByBacks = ({
  backVariant,
  height,
  numberOfStands,
  width,
}: FormStandType & { height: string }) => {
  if (backVariant === "0") {
    return []
  }

  const backs = orderBy(["h"], ["desc"], getBacks({ width }))
  let remainder = toNumber(height)
  const order = []
  const BACK_OFFSET = 10
  for (const back of backs) {
    if (remainder >= toNumber(back.h) + BACK_OFFSET) {
      const number = Math.floor(remainder / toNumber(back.h)) * numberOfStands

      order.push({ description: `${back.w} / ${back.h}`, number })
      remainder = remainder % toNumber(back.h)
    }
  }
  return order
}

const aggregateByStands = ({
  stands,
  numberOfCollections,
  height,
}: FormCollectionType) => {
  const groupStands = () =>
    groupBy(
      "description",
      flatMap(
        (stand) =>
          aggregateByBacks({
            height,
            ...stand,
          }),
        stands
      )
    )

  const sumStands = () =>
    map(
      (group) => ({
        description: group[0].description,
        number: sumBy("number", group) * numberOfCollections,
      }),
      groupStands()
    )

  return sumStands()
}

const aggregateByCollections = (data: FormCollectionType[]): OrderType => {
  const groupCollections = () =>
    groupBy(
      "description",
      flatMap((collection) => aggregateByStands(collection), data)
    )

  const sumCollections = () =>
    map(
      (group) => ({
        description: group[0].description,
        number: sumBy("number", group),
      }),
      groupCollections()
    )

  return sumCollections()
}

export const orderBacks = (data: FormCollectionType[]) => {
  return aggregateByCollections(data)
}
