import { Leg } from "../types"

interface Params {
  numberOfModules?: number
  leg: Leg
}

export const calculateLegs = ({ numberOfModules = 1, leg }: Params) => {
  const number = numberOfModules + 1
  const price = leg.price * number

  return { number, price }
}
