import { orderBy, toNumber, toInteger } from "lodash/fp"

import { FormCollectionType, FormStandType } from "../types"
import { aggregateOrder } from "./aggregateOrder"
import { getBacks } from "./getProducts"

export const orderBacks = (data: FormCollectionType[]) => {
  const aggregateByBacks = ({
    backVariant,
    height,
    numberOfStands,
    width,
  }: FormStandType & FormCollectionType) => {
    if (backVariant === "0") {
      return []
    }

    const backs = orderBy(["h"], ["desc"], getBacks({ width }))
    const order = []
    const BACK_OFFSET = 10

    let remainder = toNumber(height)

    for (const back of backs) {
      if (remainder >= toNumber(back.h) + BACK_OFFSET) {
        const number =
          Math.floor(remainder / toNumber(back.h)) *
          numberOfStands *
          toInteger(backVariant)

        order.push({
          description: `${back.w} / ${back.h}`,
          number,
          price: number * back.price,
        })
        remainder = remainder % toNumber(back.h)
      }
    }
    return order
  }

  return aggregateOrder(data, aggregateByBacks)
}
