import { groupBy, map, sumBy, isEqual } from "lodash/fp"

import {
  FormCollectionType,
  FormStandType,
  FormSubCollectionType,
  Products,
} from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderShelves = (
  data: FormCollectionType[],
  products: Products
) => {
  const aggregateByShelves = ({
    depth,
    shelves,
    numberOfStands,
    width,
  }: FormStandType & FormSubCollectionType) => {
    const joinShelves = [
      {
        depth,
        numberOfShelves: numberOfStands,
      },
      ...map(
        (shelf) => ({
          ...shelf,
          numberOfShelves: numberOfStands * shelf.numberOfShelves,
        }),
        shelves
      ),
    ]

    const groupShelves = groupBy("depth", joinShelves)

    const sumShelves = map((group) => {
      const [shelf] = products.shelves.items.filter(
        ({ d, w }) => isEqual(d, group[0].depth) && isEqual(w, width)
      )
      const number = sumBy("numberOfShelves", group)

      return {
        description: `${width} / ${shelf.d}`,
        number,
        price: number * shelf.price,
      }
    }, groupShelves)

    return sumShelves
  }

  return {
    label: products.shelves.label,
    orderDetails: aggregateOrder(data, aggregateByShelves),
  }
}
