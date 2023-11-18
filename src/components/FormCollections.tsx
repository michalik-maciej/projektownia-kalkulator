import {
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
} from "@chakra-ui/react"
import { Formik, Form, FieldArray, Field } from "formik"
import { getHeightOptions } from "../utils"
import { FormStands } from "./FormStands"

export const FormCollections = () => {
  const initialValues = {
    collections: [],
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
                  <Th>Opis</Th>
                  <Th>Wysokość</Th>
                  <Th>Szerokość</Th>
                  <Th>Stopa</Th>
                  <Th>Półki</Th>
                  <Th>Plecy</Th>
                  <Th>Usuń</Th>
                </Tr>
              </Thead>
              <FieldArray name="collections">
                {({ push, remove }) => (
                  <Tbody>
                    {collections.length > 0 &&
                      collections.map((collection, collectionIndex) => (
                        <>
                          <Tr key={collectionIndex}>
                            <Td>Ciąg {collectionIndex + 1}</Td>
                            <Td>
                              <Field
                                name={`collections.${collectionIndex}.height`}
                                as="select"
                              >
                                {getHeightOptions().map((height) => (
                                  <option
                                    key={`height-${height}`}
                                    value={height}
                                  >
                                    {height}
                                  </option>
                                ))}
                              </Field>
                            </Td>
                            <FormStands
                              collection={collection}
                              fieldName={`collections.${collectionIndex}.stands`}
                            />
                          </Tr>
                          <Tr>
                            <Td>
                              <Button
                                type="button"
                                onClick={() => remove(collectionIndex)}
                              >
                                Usuń ciąg
                              </Button>
                            </Td>
                          </Tr>
                        </>
                      ))}
                    <Tr>
                      <Td>
                        <Button
                          type="button"
                          onClick={() => push({ stands: [] })}
                        >
                          Dodaj ciąg
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                )}
              </FieldArray>
            </Table>
          </TableContainer>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
