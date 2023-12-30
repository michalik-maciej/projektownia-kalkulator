import { filter, sumBy } from "lodash/fp"

import {
  FormCollectionType,
  FormSubCollectionType,
  FormStandType,
  Products,
} from "../../types"
import { aggregateOrder } from "./aggregateOrder"

export const orderProfiles = (
  data: FormCollectionType[],
  { profiles }: Products
) => {
  const aggregateByProfiles = ({
    height,
    variant,
    stands,
  }: FormCollectionType & FormSubCollectionType & FormStandType) => {
    const profile = filter(({ h }) => h === height, profiles.items)[0]
    const number = sumBy("numberOfStands", stands) + 1

    return [
      {
        description: `${profile?.h} / ${profile?.w} / ${profile?.d}`,
        // share profiles in gondola and impulse collections between sides
        number: variant === "P" ? number : Math.ceil(0.5 * number),
        price: number * profile.price,
      },
    ]
  }
  return {
    label: profiles.label,
    orderDetails: aggregateOrder(data, aggregateByProfiles),
  }
}
