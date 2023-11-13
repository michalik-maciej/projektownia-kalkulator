import { Foot } from "../types"

interface Params {
  numberOfModules?: number
  foot: Foot
}

export const calculateFeet = ({ numberOfModules = 1, foot }: Params) => {
  const number = numberOfModules + 1
  const price = foot.price * number

  return { number, price }
}
