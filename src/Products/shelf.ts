import { filter } from "lodash/fp"

const shelf = [
  { d: 300, w: 665, price: 29.8 },
  { d: 370, w: 665, price: 43.36 },
  { d: 470, w: 665, price: 49.55 },
  { d: 300, w: 800, price: 39.0 },
  { d: 370, w: 800, price: 49.55 },
  { d: 470, w: 800, price: 64.0 },
  { d: 570, w: 800, price: 76.39 },
  { d: 300, w: 1000, price: 42.0 },
  { d: 370, w: 1000, price: 51.51 },
  { d: 470, w: 1000, price: 66.07 },
  { d: 570, w: 1000, price: 79.49 },
  { d: 300, w: 1250, price: 45.0 },
  { d: 370, w: 1250, price: 64.52 },
  { d: 470, w: 1250, price: 82.58 },
  { d: 570, w: 1250, price: 99.1 },
]

export const getShelf = (width?: number) =>
  width ? filter(({ w }) => w === width, shelf) : shelf
