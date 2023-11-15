import { filter } from "lodash/fp"

const back = [
  { h: 10, w: 66, price: 16.0 },
  { h: 20, w: 66, price: 20.65 },
  { h: 30, w: 66, price: 31.1 },
  { h: 40, w: 66, price: 34.07 },
  { h: 10, w: 80, price: 15.48 },
  { h: 20, w: 80, price: 19.72 },
  { h: 30, w: 80, price: 29.8 },
  { h: 40, w: 80, price: 33.03 },
  { h: 10, w: 100, price: 16.0 },
  { h: 20, w: 100, price: 20.65 },
  { h: 30, w: 100, price: 31.1 },
  { h: 40, w: 100, price: 34.07 },
  { h: 10, w: 125, price: 18.58 },
  { h: 20, w: 125, price: 27.87 },
  { h: 30, w: 125, price: 36.9 },
  { h: 40, w: 125, price: 41.81 },
]

interface Params {
  height?: number
  width?: number
}

export const getBack = ({ height, width }: Params) => {
  if (height && width) {
    return filter(({ h, w }) => h === height && w === width, back)
  }
  if (height) {
    return filter(({ h }) => h === height, back)
  }

  if (width) {
    return filter(({ w }) => w === width, back)
  }

  return back
}
