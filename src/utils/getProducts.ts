import { filter } from "lodash/fp"

import { supports, feet, backs, shelves, legs } from "../products"

export const getSupports = (depth?: number) =>
  depth ? filter(({ d }) => d === depth, supports) : supports

export const getFeet = () => feet

export const getBacks = ({
  height,
  width,
}: {
  height?: number
  width?: number
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

export const getShelves = (width?: number) =>
  width ? filter(({ w }) => w === width, shelves) : shelves
