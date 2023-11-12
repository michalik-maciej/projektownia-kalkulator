import { filter } from "lodash/fp"

const back = [
  { h: 100, w: 665, price: 16.0 },
  { h: 200, w: 665, price: 20.65 },
  { h: 300, w: 665, price: 31.1 },
  { h: 400, w: 665, price: 34.07 },
  { h: 100, w: 800, price: 15.48 },
  { h: 200, w: 800, price: 19.72 },
  { h: 300, w: 800, price: 29.8 },
  { h: 400, w: 800, price: 33.03 },
  { h: 100, w: 1000, price: 16.0 },
  { h: 200, w: 1000, price: 20.65 },
  { h: 300, w: 1000, price: 31.1 },
  { h: 400, w: 1000, price: 34.07 },
  { h: 100, w: 1250, price: 18.58 },
  { h: 200, w: 1250, price: 27.87 },
  { h: 300, w: 1250, price: 36.9 },
  { h: 400, w: 1250, price: 41.81 },
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
