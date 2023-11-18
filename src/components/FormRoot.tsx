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
            p="32"
            sx={{
              "& Td, Th": {
                border: "1px solid",
                textAlign: "center",
                minW: 100,
              },
            }}
          >
            <Table>
              <Thead>
                <Tr>
                  <Th>Ciąg</Th>
                  <Th>Opis</Th>
                  <Th>Wysokość</Th>
                  <Th w={500}>Regał</Th>
                </Tr>
              </Thead>
              <FormCollections
                collections={collections}
                initialCollection={initialCollection}
              />
            </Table>
          </TableContainer>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
