import { filter } from "lodash/fp"

const support = [
  { d: 300, price: 7.5 },
  { d: 370, price: 9.6 },
  { d: 470, price: 11.36 },
]

export const getSupport = (depth?: number) =>
  depth ? filter(({ d }) => d === depth, support) : support
