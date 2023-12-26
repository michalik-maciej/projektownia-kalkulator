import { filter, map, uniq } from "lodash/fp"

import { feet, shelves, legs } from "../products"

export const getHeightOptions = () => map("h", legs)

export const variantsBack = [
  { value: "0", name: "0" },
  { value: "1", name: "1" },
  { value: "2", name: "2" },
] as const

export const variantsCollection = ["P", "G", "I"] as const

export const getFootOptions = () => map("d", feet)

export const getShelfOptions = (width: string) =>
  map(
    "d",
    filter(({ w }) => w === width, shelves)
  )

export const getWidthOptions = () => uniq(map("w", shelves))
