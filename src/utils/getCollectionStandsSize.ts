import { flow, flatMap, get, size } from "lodash/fp"

import { FormCollectionType } from "../types"

export const getCollectionStandsSize = (data: FormCollectionType) =>
  flow(
    get("subCollections"), // Get the subCollections property
    flatMap("stands"), // Flatten all stands arrays into a single array
    size // Get the size of the resulting array
  )(data)
