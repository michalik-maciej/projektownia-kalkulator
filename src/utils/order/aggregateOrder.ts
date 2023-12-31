import { groupBy, map, flatMap, sumBy, take } from "lodash/fp"

import {
  FormCollectionType,
  FormStandType,
  FormSubCollectionType,
  OrderType,
} from "../../types"

export const aggregateOrder = (
  data: FormCollectionType[],
  aggregateFn: (
    Arg: FormCollectionType & FormSubCollectionType & FormStandType
  ) => OrderType["orderDetails"]
): OrderType["orderDetails"] => {
  const aggregateByStands = (
    collection: FormCollectionType,
    subCollection: FormSubCollectionType
  ) => {
    const groupStands = () =>
      groupBy(
        "description",
        flatMap(
          (stand) =>
            aggregateFn({
              ...collection,
              ...subCollection,
              ...stand,
            }),
          subCollection.stands
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

  const aggregateBySubCollections = (collection: FormCollectionType) =>
    flatMap(
      (subCollection) => aggregateByStands(collection, subCollection),
      // workaround for aggregating data from only first sub collection of "P" variant
      collection.variant === "P"
        ? take(1, collection.subCollections)
        : collection.subCollections
    )

  const groupCollections = () =>
    groupBy("description", flatMap(aggregateBySubCollections, data))

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
