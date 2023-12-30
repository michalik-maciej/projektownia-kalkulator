import { Fragment } from "react"
import { useFormikContext } from "formik"
import { size } from "lodash/fp"
import { Tr, Th, Td, Table, Tbody, Thead } from "@chakra-ui/react"

import { useOrder } from "../hooks/useOrder"
import { FormCollectionType, OrderType } from "../types"

export const Order = () => {
  const order = useOrder()
  const {
    values: { collections },
  } = useFormikContext<{ collections: FormCollectionType[] }>()

  if (!size(collections) || !order) return <div>Brak ciągów</div>

  const renderSection = ({ label, orderDetails }: OrderType, index: number) => (
    <Fragment key={index}>
      <Tr>
        <Td pl={2} colSpan={2} fontWeight={600}>
          {label}
        </Td>
      </Tr>
      {orderDetails.map(({ description, number }, index) => (
        <Tr key={index}>
          <Td>{description}</Td>
          <Td>{number}</Td>
        </Tr>
      ))}
    </Fragment>
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
        {order.map((category, index) =>
          size(category.orderDetails) ? renderSection(category, index) : null
        )}
      </Tbody>
    </Table>
  )
}
