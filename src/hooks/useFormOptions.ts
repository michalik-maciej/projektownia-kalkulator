import { filter, map, uniq } from "lodash/fp"

import { useProductsList } from "./../queries/useProductsList"
import { CollectionOption } from "../types"

export const useFormOptions = () => {
  const { data: products, ...rest } = useProductsList()

  const backOptions = [
    { value: "0", name: "0" },
    { value: "1", name: "1" },
    { value: "2", name: "2" },
  ] as const
  const collectionOptions: CollectionOption[] = ["P", "G", "I"]
  const heightOptions = map("h", products?.profiles.items)
  const footOptions = map("d", products?.feet.items)
  const widthOptions = uniq(map("w", products?.shelves.items))
  const shelfOptions = (width: string): string[] =>
    map(
      "d",
      filter(({ w }) => w === width, products?.shelves.items)
    )

  return {
    backOptions,
    collectionOptions,
    footOptions,
    heightOptions,
    widthOptions,
    shelfOptions,
    ...rest,
  }
}
