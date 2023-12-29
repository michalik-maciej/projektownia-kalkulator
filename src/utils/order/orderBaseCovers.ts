import { find } from "lodash/fp"

import { baseCovers } from "../../products"
import {
  FormCollectionType,
  FormSubCollectionType,
  FormStandType,
} from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderBaseCovers = (data: FormCollectionType[]) => {
  const aggregateByBaseCovers = ({
    hasBaseCover,
    numberOfStands,
    width,
  }: FormSubCollectionType & FormStandType) => {
    if (!hasBaseCover) {
      return []
    }

    const cover = find(({ w }) => w === width, baseCovers)

    if (!cover) {
      return []
    }

    return [
      {
        description: width,
        number: numberOfStands,
        price: numberOfStands * cover.price,
      },
    ]
  }

  return {
    productCategory: "Osłony",
    orderDetails: aggregateOrder(data, aggregateByBaseCovers),
  }
}
