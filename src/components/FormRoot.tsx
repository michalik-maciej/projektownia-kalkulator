import { Fragment } from "react"
import {
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  IconButton,
} from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { FieldArray } from "formik"

import { FormStands } from "./FormStands"

import { initialValues } from "../formInitialValues"
import { FormCollectionType } from "../types"

type Props = {
  collections: FormCollectionType[]
}
export const FormRoot = ({ collections }: Props) => {
  return (
    <FieldArray name="collections">
      {({ push: pushCollection, remove: removeCollection }) => (
        <>
          <TableContainer
            position="relative"
            p="16"
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
                  <Th display="none" rowSpan={2}>
                    Opis
                  </Th>
                  <Th rowSpan={2}>Wysokość</Th>
                  <Th rowSpan={2}>Stopa</Th>
                  <Th colSpan={5}>Regał</Th>
                </Tr>
                <Tr>
                  <Th>Szerokość</Th>
                  <Th>Ilość</Th>
                  <Th>Półki</Th>
                  <Th>Plecy</Th>
                </Tr>
              </Thead>
              <>
                <Tbody>
                  {collections.map(({ stands }, collectionIndex) => (
                    <Fragment key={collectionIndex}>
                      <FormStands
                        fieldName={`collections.${collectionIndex}`}
                        stands={stands}
                        initialStand={initialValues.collections[0].stands[0]}
                      >
                        <IconButton
                          icon={<DeleteIcon />}
                          borderRadius="full"
                          position="absolute"
                          size="xs"
                          p="0"
                          aria-label="remove collection"
                          bottom="0"
                          right="0"
                          onClick={() => removeCollection(collectionIndex)}
                        />
                      </FormStands>
                    </Fragment>
                  ))}
                </Tbody>
              </>
            </Table>
            <IconButton
              icon={<AddIcon />}
              borderRadius="full"
              position="absolute"
              size="sm"
              aria-label="remove collection"
              bottom="0"
              left="50%"
              transform="translate(-50%, -50%)"
              onClick={() => pushCollection(initialValues.collections[0])}
            />
          </TableContainer>
          <Button mx="8" mt="20" type="submit">
            Submit
          </Button>
        </>
      )}
    </FieldArray>
  )
}
