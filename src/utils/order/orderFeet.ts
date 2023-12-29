import { filter, sumBy } from "lodash/fp"

import {
  FormCollectionType,
  FormStandType,
  FormSubCollectionType,
  Products,
} from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderFeet = (data: FormCollectionType[], { feet }: Products) => {
  const aggregateByFeet = ({
    depth,
    stands,
  }: FormSubCollectionType & FormStandType) => {
    const { price: unitPrice } = filter(({ d }) => d === depth, feet)[0]
    const number = sumBy("numberOfStands", stands) + 1

    return [
      {
        description: depth,
        number,
        price: number * unitPrice,
      },
    ]
  }

  return {
    productCategory: "Stopy",
    orderDetails: aggregateOrder(data, aggregateByFeet),
  }
}
