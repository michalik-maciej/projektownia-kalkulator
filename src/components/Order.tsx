import { size } from "lodash/fp"
import { Tr, Th, Td, Table, Tbody, Thead } from "@chakra-ui/react"

import { useOrder } from "../hooks/useOrder"
import { FormCollectionType, OrderType } from "../types"

type Props = {
  collections: FormCollectionType[]
}

export const Order = ({ collections }: Props) => {
  const order = useOrder()

  if (!size(collections) || !order) return <div>Brak ciągów</div>

  const renderSection = ({ productCategory, orderDetails }: OrderType) => (
    <>
      <Tr>
        <Td pl={2} colSpan={2} fontWeight={600}>
          {productCategory}
        </Td>
      </Tr>
      {orderDetails.map(({ description, number }, index) => (
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
        {order.map((category) =>
          size(category.orderDetails) ? renderSection(category) : null
        )}
      </Tbody>
    </Table>
  )
}
