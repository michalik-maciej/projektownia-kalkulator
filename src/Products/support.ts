import { filter } from "lodash/fp"

const support = [
  { d: 30, price: 7.5 },
  { d: 37, price: 9.6 },
  { d: 47, price: 11.36 },
]

export const getSupport = (depth?: number) =>
  depth ? filter(({ d }) => d === depth, support) : support
