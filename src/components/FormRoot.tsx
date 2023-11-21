import { Button, Table, TableContainer, Thead, Tr, Th } from "@chakra-ui/react"
import { Formik, Form } from "formik"

import {
  getHeightOptions,
  variantsBack,
  getFootOptions,
  getWidthOptions,
  getShelfOptions,
} from "../utils"
import { FormCollectionType } from "../types"

import { FormCollections } from "./FormCollections"

export const FormRoot = () => {
  const initialWidth = getWidthOptions()[1]

  const initialShelves = {
    depth: getShelfOptions(initialWidth)[2],
    numberOfShelves: 5,
  }

  const initialStands = {
    backVariant: variantsBack[0],
    foot: getFootOptions()[2],
    numberOfStands: 1,
    shelves: [initialShelves],
    width: initialWidth,
  }

  const initialCollection: FormCollectionType = {
    height: getHeightOptions()[3],
    variant: "P",
    stands: [initialStands],
  }

  const initialValues: { collections: FormCollectionType[] } = {
    collections: [initialCollection],
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values: { collections } }) => (
        <Form>
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
              <FormCollections
                collections={collections}
                initialCollection={initialCollection}
              />
            </Table>
          </TableContainer>
          <Button mx="8" mt="20" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
