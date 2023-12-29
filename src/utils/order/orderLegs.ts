import { filter, sumBy } from "lodash/fp"

import {
  FormCollectionType,
  FormSubCollectionType,
  FormStandType,
  Products,
} from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderLegs = (data: FormCollectionType[], { legs }: Products) => {
  const aggregateByLegs = ({
    height,
    variant,
    stands,
  }: FormCollectionType & FormSubCollectionType & FormStandType) => {
    const leg = filter(({ h }) => h === height, legs)[0]
    const number = sumBy("numberOfStands", stands) + 1

    return [
      {
        description: `${leg?.h} / ${leg?.w} / ${leg?.d}`,
        // share legs in gondola and impulse collections between sides
        number: variant === "P" ? number : Math.ceil(0.5 * number),
        price: number * leg.price,
      },
    ]
  }
  return {
    productCategory: "Profile",
    orderDetails: aggregateOrder(data, aggregateByLegs),
  }
}
