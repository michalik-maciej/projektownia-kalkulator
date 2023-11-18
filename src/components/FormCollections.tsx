import { Button, Tr, Td, Tbody } from "@chakra-ui/react"
import { FieldArray, Field } from "formik"

import { getHeightOptions, variantsCollection } from "../utils"
import { FormCollectionType } from "../types"

import { FormStands } from "./FormStands"
import { Fragment } from "react"

interface Props {
  collections: FormCollectionType[]
  initialCollection: FormCollectionType
}

export const FormCollections = ({ collections, initialCollection }: Props) => {
  return (
    <FieldArray name="collections">
      {({ push: pushCollection, remove: removeCollection }) => (
        <Tbody>
          {collections.length > 0 &&
            collections.map((collection, collectionIndex) => (
              <Fragment key={collectionIndex}>
                <Tr>
                  <Td>
                    <Field
                      name={`collections.${collectionIndex}.variant`}
                      as="select"
                    >
                      {variantsCollection.map((variant) => (
                        <option
                          key={variant}
                          value={variant}
                          disabled={variant !== "P"}
                        >
                          {variant}
                        </option>
                      ))}
                    </Field>
                  </Td>
                  <Td>Ciąg {collectionIndex + 1}</Td>
                  <Td>
                    <Field
                      name={`collections.${collectionIndex}.height`}
                      as="select"
                    >
                      {getHeightOptions().map((height) => (
                        <option key={height} value={height}>
                          {height}
                        </option>
                      ))}
                    </Field>
                  </Td>
                  <Td>
                    <FormStands
                      stands={collections[collectionIndex].stands}
                      initialStand={initialCollection.stands[0]}
                      fieldName={`collections.${collectionIndex}.stands`}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Button
                      type="button"
                      onClick={() => removeCollection(collectionIndex)}
                    >
                      Usuń ciąg
                    </Button>
                  </Td>
                </Tr>
              </Fragment>
            ))}
          <Tr>
            <Td>
              <Button
                type="button"
                onClick={() => pushCollection(initialCollection)}
              >
                Dodaj ciąg
              </Button>
            </Td>
          </Tr>
        </Tbody>
      )}
    </FieldArray>
  )
}
