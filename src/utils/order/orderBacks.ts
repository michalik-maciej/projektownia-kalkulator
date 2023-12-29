import { orderBy, toNumber, toInteger } from "lodash/fp"

import { FormCollectionType, FormStandType } from "../../types"
import { getBacks } from "../getProducts"
import { aggregateOrder } from "./aggregateOrder"

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
    let remainder = toNumber(height) - BACK_OFFSET

    for (const back of backs) {
      if (remainder >= toNumber(back.h)) {
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

  return {
    productCategory: "Plecy",
    orderDetails: aggregateOrder(data, aggregateByBacks),
  }
}
