import { Fragment } from "react"
import {
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react"
import { FieldArray } from "formik"

import { FormStands } from "./FormStands"

import { initialValues } from "../formInitialValues"
import { FormCollectionType } from "../types"

type Props = {
  collections: FormCollectionType[]
}
export const FormRoot = ({ collections }: Props) => {
  return (
    <>
      <TableContainer
        p="8"
        sx={{
          "& Td, Th": {
            border: "1px solid",
            textAlign: "center",
            w: "50px",
          },
        }}
      >
        <Table>
          <Thead>
            <Tr>
              <Th rowSpan={2}>Ciąg</Th>
              <Th rowSpan={2}>Opis</Th>
              <Th rowSpan={2}>Wysokość</Th>
              <Th colSpan={5}>Regał</Th>
            </Tr>
            <Tr>
              <Th>Szerokość</Th>
              <Th>Ilość</Th>
              <Th>Stopa</Th>
              <Th>Półki</Th>
              <Th>Plecy</Th>
            </Tr>
          </Thead>
          <FieldArray name="collections">
            {({ push: pushCollection, remove: removeCollection }) => (
              <>
                <Tbody>
                  {collections.map(({ stands }, collectionIndex) => (
                    <Fragment key={collectionIndex}>
                      <FormStands
                        fieldName={`collections.${collectionIndex}`}
                        stands={stands}
                        initialStand={initialValues.collections[0].stands[0]}
                      />
                      <Button
                        position="absolute"
                        transform="translate(-100%, -150%)"
                        type="button"
                        onClick={() => removeCollection(collectionIndex)}
                      >
                        - Ciąg
                      </Button>
                    </Fragment>
                  ))}
                </Tbody>
                <Button
                  type="button"
                  position="absolute"
                  transform="translate(-100%, 50%)"
                  onClick={() => pushCollection(initialValues.collections[0])}
                >
                  + Ciąg
                </Button>
              </>
            )}
          </FieldArray>
        </Table>
      </TableContainer>
      <Button mx="8" mt="20" type="submit">
        Submit
      </Button>
    </>
  )
}
