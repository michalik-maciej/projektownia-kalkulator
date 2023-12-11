import { groupBy, map, flatMap, sumBy, isEqual } from "lodash/fp"

import { shelves as products } from "../products"
import { FormCollectionType, FormStandType, OrderType } from "../types"

export const orderShelves = (data: FormCollectionType[]): OrderType => {
  const aggregateByShelves = ({
    depth,
    shelves,
    numberOfStands,
    width,
  }: FormStandType & { depth: string }) => {
    const joinShelves = () => [
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

    const groupShelves = () => groupBy("depth", joinShelves())

    const sumShelves = () =>
      map((group) => {
        const [shelf] = products.filter(
          ({ d, w }) => isEqual(d, group[0].depth) && isEqual(w, width)
        )
        const number = sumBy("numberOfShelves", group)

        return {
          description: `${width} / ${shelf.d}`,
          number,
          price: number * shelf.price,
        }
      }, groupShelves())

    return sumShelves()
  }

  const aggregateByStands = ({
    depth,
    numberOfCollections,
    stands,
  }: FormCollectionType) => {
    const groupStands = () =>
      groupBy(
        "description",
        flatMap((stand) => aggregateByShelves({ depth, ...stand }), stands)
      )

    const sumStands = () =>
      map(
        (group) => ({
          description: group[0].description,
          number: sumBy("number", group) * numberOfCollections,
          price: sumBy("price", group) * numberOfCollections,
        }),
        groupStands()
      )

    return sumStands()
  }

  const aggregateByCollections = () => {
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
          price: sumBy("price", group),
        }),
        groupCollections()
      )

    return sumCollections()
  }

  return aggregateByCollections()
}
