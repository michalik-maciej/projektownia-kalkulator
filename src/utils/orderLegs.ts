import { filter, sumBy } from "lodash/fp"

import {
  FormCollectionType,
  FormSubCollectionType,
  FormStandType,
} from "../types"
import { legs } from "../products"
import { aggregateOrder } from "./aggregateOrder"

export const orderLegs = (data: FormCollectionType[]) => {
  const aggregateByLegs = ({
    height,
    stands,
  }: FormSubCollectionType & FormStandType) => {
    const leg = filter(({ h }) => h === height, legs)[0]
    const number = sumBy("numberOfStands", stands) + 1

    return [
      {
        description: `${leg?.h} / ${leg?.w} / ${leg?.d}`,
        number,
        price: number * leg.price,
      },
    ]
  }
  return aggregateOrder(data, aggregateByLegs)
}
