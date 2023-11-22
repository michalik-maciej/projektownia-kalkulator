import { Tr, Th, Td, Table, Tbody, Thead } from "@chakra-ui/react"
import { orderLegs } from "../utils"
import { FormCollectionType } from "../types"

type Props = {
  collections: FormCollectionType[]
}

export const Order = ({ collections }: Props) => {
  const legs = orderLegs(collections)

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
      </Tbody>
    </Table>
  )
}
