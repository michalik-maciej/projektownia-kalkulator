import { filter } from "lodash/fp"

const shelf = [
  { d: 30, w: 66, price: 29.8 },
  { d: 37, w: 66, price: 43.36 },
  { d: 47, w: 66, price: 49.55 },
  { d: 30, w: 80, price: 39.0 },
  { d: 37, w: 80, price: 49.55 },
  { d: 47, w: 80, price: 64.0 },
  { d: 57, w: 80, price: 76.39 },
  { d: 30, w: 100, price: 42.0 },
  { d: 37, w: 100, price: 51.51 },
  { d: 47, w: 100, price: 66.07 },
  { d: 57, w: 100, price: 79.49 },
  { d: 30, w: 125, price: 45.0 },
  { d: 37, w: 125, price: 64.52 },
  { d: 47, w: 125, price: 82.58 },
  { d: 57, w: 125, price: 99.1 },
]

export const getShelf = (width?: number) =>
  width ? filter(({ w }) => w === width, shelf) : shelf
