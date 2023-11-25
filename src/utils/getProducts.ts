import { filter } from "lodash/fp"

import { supports, feet, backs, shelves, legs } from "../products"

export const getSupports = (depth?: string) =>
  depth ? filter(({ d }) => d === depth, supports) : supports

export const getFeet = () => feet

export const getBacks = ({
  height,
  width,
}: {
  height?: string
  width?: string
}) => {
  if (height && width) {
    return filter(({ h, w }) => h === height && w === width, backs)
  }
  if (height) {
    return filter(({ h }) => h === height, backs)
  }

  if (width) {
    return filter(({ w }) => w === width, backs)
  }

  return backs
}

export const getLegs = () => legs

export const getShelves = (width?: string) =>
  width ? filter(({ w }) => w === width, shelves) : shelves
