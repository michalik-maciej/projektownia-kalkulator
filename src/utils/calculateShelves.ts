import { getSupports } from "./getProducts"
import { Shelf } from "../types"

interface Params {
  numberOfModules?: number
  shelvesPerModule: number
  shelf: Shelf
}

export const calculateShelves = ({
  numberOfModules = 1,
  shelvesPerModule,
  shelf,
}: Params) => {
  const numberOfShelves = numberOfModules * shelvesPerModule
  const support = getSupports(shelf.d)[0]

  const shelves = {
    number: numberOfShelves,
    price: shelf.price * numberOfShelves,
  }

  const supports = support
    ? {
        number: 2 * numberOfShelves,
        price: support.price * numberOfShelves,
      }
    : {}

  return { shelves, supports }
}
