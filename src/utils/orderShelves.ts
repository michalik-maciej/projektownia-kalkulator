import { groupBy, map, flatMap, sumBy } from "lodash/fp"

import { FormCollectionType, FormStandType } from "../types"

export const orderShelves = (data: FormCollectionType[]) => {
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
      map(
        (group) => ({
          description: `${width} / ${group[0].depth}`,
          number: sumBy("numberOfShelves", group),
        }),
        groupShelves()
      )

    return sumShelves()
  }

  const aggregateByStands = ({ stands, depth }: FormCollectionType) => {
    const groupStands = () =>
      groupBy(
        "description",
        flatMap((stand) => aggregateByShelves({ depth, ...stand }), stands)
      )

    const sumStands = () =>
      map(
        (group) => ({
          description: group[0].description,
          number: sumBy("number", group),
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
        }),
        groupCollections()
      )

    return sumCollections()
  }

  return aggregateByCollections()
}
