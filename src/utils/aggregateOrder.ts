import { groupBy, map, flatMap, sumBy } from "lodash/fp"

import { FormCollectionType, FormStandType, OrderType } from "../types"

export const aggregateOrder = (
  data: FormCollectionType[],
  aggregateFn: (Arg: FormCollectionType & FormStandType) => OrderType
): OrderType => {
  const aggregateByStands = (collection: FormCollectionType) => {
    const groupStands = () =>
      groupBy(
        "description",
        flatMap(
          (stand) =>
            aggregateFn({
              ...collection,
              ...stand,
            }),
          collection.stands
        )
      )

    const sumStands = () =>
      map(
        (group) => ({
          description: group[0].description,
          number: sumBy("number", group) * collection.numberOfCollections,
          price: sumBy("price", group) * collection.numberOfCollections,
        }),
        groupStands()
      )

    return sumStands()
  }

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
