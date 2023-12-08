import {
  getHeightOptions,
  variantsBack,
  getFootOptions,
  getWidthOptions,
  getShelfOptions,
} from "./utils"
import { FormCollectionType } from "./types"

const initialWidth = getWidthOptions()[1]

const initialShelves = {
  depth: getShelfOptions(initialWidth)[2],
  numberOfShelves: 5,
}

const initialStands = {
  backVariant: variantsBack[1].value,
  numberOfStands: 1,
  shelves: [initialShelves],
  width: initialWidth,
}

const initialCollection: FormCollectionType = {
  numberOfCollections: 1,
  height: getHeightOptions()[3],
  depth: getFootOptions()[2],
  variant: "P",
  stands: [initialStands],
}

export const initialValues: { collections: FormCollectionType[] } = {
  collections: [initialCollection],
}
