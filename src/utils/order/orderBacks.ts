import { orderBy, toNumber, toInteger, filter } from "lodash/fp"

import { FormCollectionType, FormStandType, Products } from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderBacks = (data: FormCollectionType[], { backs }: Products) => {
  const aggregateByBacks = ({
    backVariant,
    height,
    numberOfStands,
    width,
  }: FormStandType & FormCollectionType) => {
    if (backVariant === "0") {
      return []
    }

    const filteredBacks = filter(({ w }) => (width ? w === width : true), backs)
    const sortedBacks = orderBy(["h"], ["desc"], filteredBacks)
    const order = []

    const BACK_OFFSET = 10
    let remainder = toNumber(height) - BACK_OFFSET

    for (const back of sortedBacks) {
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
