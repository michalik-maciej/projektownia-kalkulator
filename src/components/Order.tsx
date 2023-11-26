import { size } from "lodash/fp"
import { Tr, Th, Td, Table, Tbody, Thead } from "@chakra-ui/react"

import { orderFeet, orderLegs, orderShelves } from "../utils"
import { FormCollectionType } from "../types"

type Props = {
  collections: FormCollectionType[]
}

export const Order = ({ collections }: Props) => {
  if (!size(collections)) return <div>Brak ciągów</div>

  const legs = orderLegs(collections)
  const feet = orderFeet(collections)
  const shelves = orderShelves(collections)

  return (
    <Table w="30%" m="8">
      <Thead>
        <Tr>
          <Th>Element</Th>
          <Th>Ilość</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td colSpan={2} fontWeight={600}>
            Profile
          </Td>
        </Tr>
        {legs.map(({ description, number }, index) => (
          <Tr key={index}>
            <Td>{description}</Td>
            <Td>{number}</Td>
          </Tr>
        ))}
        {/* <Tr>
          <Td colSpan={2} fontWeight={600}>
            Stopy
          </Td>
        </Tr>
        {feet.map(({ description, number }, index) => (
          <Tr key={index}>
            <Td>{description}</Td>
            <Td>{number}</Td>
          </Tr>
        ))} */}
        <Tr>
          <Td colSpan={2} fontWeight={600}>
            Półki
          </Td>
        </Tr>
        {shelves.map(({ description, number }, index) => (
          <Tr key={index}>
            <Td>{description}</Td>
            <Td>{number}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
