import { groupBy, map, flatMap, sumBy } from "lodash/fp"

import { FormCollectionType, FormStandType, OrderType } from "../types"
import { supports } from "../products"

export const orderSupports = (data: FormCollectionType[]): OrderType => {
  const aggregateBySupports = ({ shelves, numberOfStands }: FormStandType) => {
    const groupSupports = groupBy("depth", shelves)

    const sumSupports = map((group) => {
      const number = 2 * sumBy("numberOfShelves", group) * numberOfStands
      const [{ price: unitPrice }] = supports.filter(
        ({ d }) => d === group[0].depth
      )

      return {
        description: group[0].depth,
        number,
        price: number * unitPrice,
      }
    }, groupSupports)

    return sumSupports
  }

  const aggregateByStands = ({
    stands,
    numberOfCollections,
  }: FormCollectionType) => {
    const groupStands = () =>
      groupBy(
        "description",
        flatMap((stand) => aggregateBySupports(stand), stands)
      )

    const sumStands = map(
      (group) => ({
        description: group[0].description,
        number: sumBy("number", group) * numberOfCollections,
        price: sumBy("price", group) * numberOfCollections,
      }),
      groupStands()
    )

    return sumStands
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
