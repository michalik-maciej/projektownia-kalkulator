import { FormCollectionType } from "../types"
import { useFormOptions } from "./useFormOptions"

export const useFormInitialValues = () => {
  const {
    backOptions,
    footOptions,
    heightOptions,
    shelfOptions,
    widthOptions,
    ...rest
  } = useFormOptions()

  const width = widthOptions[1]

  const initialValues: { collections: FormCollectionType[] } = {
    collections: [
      {
        isCollapsed: false,
        isEditLocked: false,
        height: heightOptions[3],
        numberOfCollections: 1,
        variant: "P",
        subCollections: Array(2).fill({
          depth: footOptions[2],
          hasBaseCover: true,
          stands: [
            {
              backVariant: backOptions[1].value,
              numberOfStands: 1,
              shelves: [
                {
                  depth: shelfOptions(width)[2],
                  numberOfShelves: 5,
                },
              ],
              width,
            },
          ],
        }),
      },
    ],
  }

  return { initialValues, ...rest }
}
