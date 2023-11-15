import {
  Box,
  Button,
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Tbody,
  Th,
} from "@chakra-ui/react"
import { uniq, map } from "lodash/fp"
import { getShelf, getFoot } from "../products"

import { Formik, Form, FieldArray, Field } from "formik"

export const MainInput = () => {
  const initialValues = {
    stands: [],
  }

  const backOptions = ["standard", "euro", "brak"]
  const footOptions = getFoot()
  const widthOptions = uniq(map(({ w }) => w, getShelf()))

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ values }) => (
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
                    <Th>Szerokość</Th>
                    <Th>Stopa</Th>
                    <Th>Półki</Th>
                    <Th>Plecy</Th>
                    <Th>Usuń</Th>
                  </Tr>
                </Thead>
                <FieldArray name="stands">
                  {({ remove, push }) => (
                    <Tbody>
                      {values.stands.length > 0 &&
                        values.stands.map(
                          (
                            {
                              base = footOptions[0].w,
                              numberOfShelves = 5,
                              width = widthOptions[0],
                            },
                            index
                          ) => (
                            <Tr key={index}>
                              <Td>
                                <Box>{`${width} / ${base} / ${numberOfShelves}`}</Box>
                              </Td>
                              <Td>
                                <Field
                                  name={`stands.${index}.width`}
                                  as="select"
                                >
                                  {map(
                                    (width) => (
                                      <option
                                        key={`width-${width}`}
                                        value={width}
                                      >
                                        {width}
                                      </option>
                                    ),
                                    widthOptions
                                  )}
                                </Field>
                              </Td>
                              <Td>
                                <Field
                                  as="select"
                                  name={`stands.${index}.base`}
                                >
                                  {map(
                                    ({ w }) => (
                                      <option key={`base-${w}`} value={w}>
                                        {w}
                                      </option>
                                    ),
                                    footOptions
                                  )}
                                </Field>
                              </Td>
                              <Td>
                                <Field as="select" value="shelf">
                                  {map(
                                    ({ w }) => (
                                      <option key={`base-${w}`} value={w}>
                                        {w}
                                      </option>
                                    ),
                                    footOptions
                                  )}
                                </Field>
                                <Field
                                  value={numberOfShelves}
                                  name={`stands.${index}.numberOfShelves`}
                                  type="number"
                                />
                              </Td>
                              <Td>
                                <Field
                                  as="select"
                                  name={`stands.${index}.back`}
                                >
                                  {map(
                                    (option) => (
                                      <option
                                        key={`back-${option}`}
                                        value={option}
                                      >
                                        {option}
                                      </option>
                                    ),
                                    backOptions
                                  )}
                                </Field>
                              </Td>
                              <Td>
                                <Button
                                  type="button"
                                  className="secondary"
                                  onClick={() => remove(index)}
                                >
                                  X
                                </Button>
                              </Td>
                            </Tr>
                          )
                        )}
                      <Tr>
                        <Td>
                          <Button
                            fontWeight={700}
                            type="button"
                            onClick={() => push({})}
                          >
                            + Dodaj
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  )}
                </FieldArray>
              </Table>
            </TableContainer>
            <Button type="submit">submit</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
