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
  depth: getFootOptions()[2],
  hasBaseCover: true,
  height: getHeightOptions()[3],
  isCollapsed: false,
  numberOfCollections: 1,
  stands: [initialStands],
  variant: "P",
}

export const initialValues: { collections: FormCollectionType[] } = {
  collections: [initialCollection],
}
