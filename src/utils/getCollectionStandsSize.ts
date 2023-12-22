import { eq, flatMap, size, take } from "lodash/fp"

import { FormCollectionType } from "../types"

export const getCollectionStandsSize = ({
  subCollections,
  variant,
}: FormCollectionType) => {
  const stands = flatMap(
    "stands",
    // workaround for spanning rows from only first sub collection of "P" variant
    eq("P", variant) ? take(1, subCollections) : subCollections
  )

  return size(stands)
}
