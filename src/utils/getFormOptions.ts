import { filter, map, uniq } from "lodash/fp"

import { feet, shelves, legs } from "../products"

export const getHeightOptions = () => map("h", legs)

export const variantsBack = ["standard", "euro", "brak"]

export const variantsCollection = ["P", "G", "S"] as const

export const getFootOptions = () => map("d", feet)

export const getShelfOptions = (width: number) =>
  map(
    "d",
    filter(({ w }) => w === width, shelves)
  )

export const getWidthOptions = () => uniq(map("w", shelves))
