import { Formik, Form, FieldArray } from "formik"
import { getFirestore, doc, setDoc } from "firebase/firestore/lite"
import { values as lodashValues } from "lodash/fp"
import {
  AbsoluteCenter,
  Button,
  Spinner,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import { SaveIcon } from "../icons/SaveIcon"
import { useProductsList } from "../queries/useProductsList"
import { Products } from "../types"

import { FormProduct } from "./FormProduct"

export const FormProducts = () => {
  const { data, isLoading } = useProductsList()
  const db = getFirestore()

  if (isLoading || !data) {
    return (
      <AbsoluteCenter>
        <Spinner />
      </AbsoluteCenter>
    )
  }

  const handleSubmit = (values: Products) => {
    console.log({ values })
    setDoc(doc(db, "products", "catalog"), values)
  }

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values: { other, ...rest } }) => {
        return (
          <Form>
            <Button
              mt="4"
              borderRadius="full"
              aria-label="submit form"
              type="submit"
              leftIcon={<SaveIcon />}
            >
              Zapisz
            </Button>
            <Tabs mt="8" variant="enclosed" isFitted>
              <TabList>
                {lodashValues({ ...rest, other }).map(({ label }, index) => (
                  <Tab key={index}>{label}</Tab>
                ))}
              </TabList>
              <TabPanels>
                {Object.entries({ ...rest, other }).map(([key, { items }]) => (
                  <TabPanel key={key}>
                    <Table
                      w="800px"
                      m="auto"
                      mt="8"
                      sx={{ "th, td": { textAlign: "center" } }}
                    >
                      <Thead>
                        <Tr>
                          {key === "other" && <Th>rodzaj</Th>}
                          <Th>szerokość (cm)</Th>
                          <Th>wysokość (cm)</Th>
                          <Th>głębokość (cm)</Th>
                          <Th>cena (zł)</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <FieldArray name={`${key}.items`}>
                          {({ remove: removeItem, push: pushItem }) => {
                            return (
                              <>
                                {items.map((item, itemIndex) => (
                                  <FormProduct
                                    item={item}
                                    itemIndex={itemIndex}
                                    categoryName={key}
                                    insertItem={() => pushItem(item)}
                                    removeItem={() => removeItem(itemIndex)}
                                  />
                                ))}
                              </>
                            )
                          }}
                        </FieldArray>
                      </Tbody>
                    </Table>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Form>
        )
      }}
    </Formik>
  )
}
