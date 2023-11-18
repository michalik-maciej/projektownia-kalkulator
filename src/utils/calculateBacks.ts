import { orderBy } from "lodash/fp"
import { getBacks } from "./getProducts"

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
  const backs = orderBy(["h"], ["desc"], getBacks({ width }))

  let remainder = height
  const order = []
  const BACK_OFFSET = 10

  for (const back of backs) {
    if (remainder >= back.h + BACK_OFFSET) {
      const number = Math.floor(remainder / back.h)
      order.push({ element: back, number })
      remainder = remainder % back.h
    }
  }

  return { order }
}
