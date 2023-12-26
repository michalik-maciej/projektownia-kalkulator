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
  isCollapsed: false,
  isEditLocked: false,
  height: getHeightOptions()[3],
  numberOfCollections: 1,
  variant: "P",
  subCollections: Array(2).fill({
    depth: getFootOptions()[2],
    hasBaseCover: true,
    stands: [initialStands],
  }),
}

export const initialValues: { collections: FormCollectionType[] } = {
  collections: [initialCollection],
}
