import { filter, map, uniq } from "lodash/fp"

import { feet, shelves, legs } from "../products"

export const getHeightOptions = () => map("h", legs)

export const variantsBack = [
  { value: "1", name: "standard" },
  { value: "euro", name: "euro" },
  { value: "0", name: "brak" },
  { value: "2", name: "podwójne" },
]

export const variantsCollection = ["P", "G"] as const

export const getFootOptions = () => map("d", feet)

export const getShelfOptions = (width: string) =>
  map(
    "d",
    filter(({ w }) => w === width, shelves)
  )

export const getWidthOptions = () => uniq(map("w", shelves))
