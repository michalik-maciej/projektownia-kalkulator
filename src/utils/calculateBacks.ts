import { orderBy } from "lodash/fp"
import { getBack } from "../products"

interface Params {
  numberOfModules?: number
  height: number
  width: number
}

export const calculateBacks = ({
  numberOfModules = 1,
  height,
  width,
}: Params) => {
  const backs = orderBy(["h"], ["desc"], getBack({ width }))

  let remainder = height
  const order = []

  for (const back of backs) {
    if (remainder > back.h) {
      const number = Math.floor(remainder / back.h)
      order.push({ element: back, number })
      remainder = remainder % back.h
    }
  }

  return { order }
}
