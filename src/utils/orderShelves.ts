import { flow, head, groupBy, map, flatMap, sumBy } from "lodash/fp"

import { FormCollectionType, FormStandType, FormShelfType } from "../types"

type OutputItem = {
  description: string
  number: number
}

export const orderBaseShelves = (data: FormCollectionType[]) =>
  flow(
    flatMap((item: FormCollectionType) =>
      item.stands.map((stand) => ({
        foot: item.foot,
        width: stand.width,
        numberOfStands: stand.numberOfStands,
      }))
    ),
    groupBy(({ foot, width }) => `${width} / ${foot}`),
    map((group) => {
      const { foot, width } = head(group) || { foot: "", width: "" }
      return {
        description: `${width} / ${foot}`,
        number: sumBy("numberOfStands", group),
      }
    })
  )(data) as unknown as { description: string; number: number }[]

export const orderShelves = (data: FormCollectionType[]) => {
  const stands = data[0].stands

  const flatStand = flatMap(flattenStand, stands)

  function flattenStand({ shelves, numberOfStands, width }: FormStandType) {
    function mapShelf({ depth, numberOfShelves }: FormShelfType) {
      return {
        depth,
        numberOfShelves,
        foot: data[0].foot,
        width,
        numberOfStands,
      }
    }

    return shelves.map(mapShelf)
  }

  console.log(stands, flatStand)

  const flat = flatMap(flattenCollection, data)

  const groups = groupBy(({ foot, width }) => `${width} / ${foot}`, flat)

  const maps = map((group) => {
    const { foot, width } = group[0]
    return {
      description: `${width} / ${foot}`,
      number: sumBy("numberOfStands", group),
    }
  }, groups)

  // console.log(data, flat)

  function flattenCollection(collection: FormCollectionType) {
    function mapStand({ width, shelves, numberOfStands }: FormStandType) {
      return { width, numberOfStands, shelves, foot: collection.foot }
    }

    return collection.stands.map(mapStand)
  }

  return null
}
