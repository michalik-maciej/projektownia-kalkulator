import { find, groupBy, map, sumBy } from "lodash/fp"

import { FormCollectionType, FormStandType, Products } from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderSupports = (
  data: FormCollectionType[],
  { supports }: Products
) => {
  const aggregateBySupports = ({ shelves, numberOfStands }: FormStandType) => {
    const groupSupports = groupBy("depth", shelves)

    const sumSupports = map((group) => {
      const number = 2 * sumBy("numberOfShelves", group) * numberOfStands
      const support = find(({ d }) => d === group[0].depth, supports)
      const unitPrice = support ? support.price : 0

      return {
        description: group[0].depth,
        number,
        price: number * unitPrice,
      }
    }, groupSupports)

    return sumSupports
  }

  return {
    productCategory: "Wsporniki",
    orderDetails: aggregateOrder(data, aggregateBySupports),
  }
}
