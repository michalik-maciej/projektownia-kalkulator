import { size } from "lodash/fp"
import { Tr, Th, Td, Table, Tbody, Thead } from "@chakra-ui/react"

import {
  orderBacks,
  orderBaseCovers,
  orderFeet,
  orderLegs,
  orderShelves,
  orderSupports,
} from "../utils"
import { FormCollectionType } from "../types"

type Props = {
  collections: FormCollectionType[]
}

type SectionProps = {
  name: string
  order: { description: string; number: number }[]
}

export const Order = ({ collections }: Props) => {
  if (!size(collections)) return <div>Brak ciągów</div>

  const legs = { name: "Profile", order: orderLegs(collections) }
  const feet = { name: "Stopy", order: orderFeet(collections) }
  const shelves = { name: "Półki", order: orderShelves(collections) }
  const supports = { name: "Wsporniki", order: orderSupports(collections) }
  const backs = { name: "Plecy", order: orderBacks(collections) }
  const baseCovers = {
    name: "Osłony dolne",
    order: orderBaseCovers(collections),
  }

  const renderSection = ({ name, order }: SectionProps) => (
    <>
      <Tr>
        <Td pl={2} colSpan={2} fontWeight={600}>
          {name}
        </Td>
      </Tr>
      {order.map(({ description, number }, index) => (
        <Tr key={index}>
          <Td>{description}</Td>
          <Td>{number}</Td>
        </Tr>
      ))}
    </>
  )

  return (
    <Table w="360px" m="8">
      <Thead>
        <Tr>
          <Th>Element</Th>
          <Th>Ilość</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[legs, feet, shelves, supports, backs, baseCovers].map((category) =>
          size(category.order) ? renderSection(category) : null
        )}
      </Tbody>
    </Table>
  )
}
