import { filter } from "lodash/fp"

import { backs } from "../products"

export const getBacks = ({ width }: { width?: string }) => {
  return filter(({ w }) => (width ? w === width : true), backs)
}
